import { OrderStatus } from "../../../generated/prisma/enums"
import CustomError from "../../helper/customError";
import { prisma } from "../../lib/prisma";

// data = {
//     address: "Dhaka, Gazipur",
//     orders: {
//         "aaa": ["a", "b"],
//         "bbb": ["c", "d"],
//         "ccc": ["e", "f"]
//     }
// }
type Data = {
    name: string;
    phone: string;
    address: string;
    orders: Record<string, string[]>
}
const addOrder = async (data: Data, userId: string) => {
    Object.entries(data.orders).forEach(async ([sellerId, cartIds]) => {
        const order = await prisma.order.create({
            data: {
                sellerId: sellerId,
                customerId: userId,
                address: data.address,
                name: data.name,
                phone: data.phone
            }
        });
        await prisma.cart.updateMany({
            where: {
                id: {
                    in: cartIds
                }
            },
            data: {
                orderId: order.id
            }
        });
    });
    return [];

}
const getOrder = async (userId: string, sortby: "asc" | "desc", status: OrderStatus | "ALL") => {
    const orders = await prisma.order.findMany({
        where: {
            customerId: userId,
            ...(status !== "ALL" && { status })
        },
        include: {
            carts: {
                select: {
                    quantity: true,
                    medicine: {
                        select: {
                            price: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: sortby
        }
    });

    const formatedOrders = orders.map(order => {
        const totalPrice = order.carts.reduce((total: number, cart: any) => cart.quantity * cart.medicine.price + total, 60);
        const { carts, ...orderWithoutCarts } = order;
        return {
            ...orderWithoutCarts,
            totalPrice
        };
    })
    return formatedOrders;
}
const getSingleOrder = async (orderId: string, userId: string) => {
    const order = await prisma.order.findUnique({
        where: {
            id: orderId,
            customerId: userId
        },
        include: {
            seller: {
                select: {
                    id: true,
                    name: true,
                }
            },
            carts: {
                include: {
                    medicine: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                            price: true
                        }
                    }
                }
            }
        }
    });
    if (!order) {
        throw new CustomError.NotFoundError("Unable to retrive your order! The order might no longer exist.");
    }

    return order;
}
const updateOrder = async (orderId: string, userId: string) => {
    const order = await prisma.order.findUnique({
        where: {
            id: orderId,
            customerId: userId
        },
        select: {
            customerId: true,
            status: true
        }
    });
    if (!order) {
        throw new CustomError.NotFoundError("Unable to cancel your order! The order might no longer exist.");
    }

    if (order.status !== OrderStatus.PROCESSING) {
        throw new CustomError.PermissionError("Unable to cancel the order! Order is accepted by seller");
    }

    return await prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            status: OrderStatus.CANCELLED
        }
    });
}


export const orderService = {
    addOrder,
    getOrder,
    updateOrder,
    getSingleOrder,
}