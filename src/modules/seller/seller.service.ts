import { Medicine, OrderStatus, UserRole } from "../../../generated/prisma/client";
import CustomError from "../../helper/customError";
import { prisma } from "../../lib/prisma";
import { LoggedInUser } from "../../types/loggedInUser";

type MedicinePayload = {
    image: string;
    name: string;
    description: string,
    categoryId: string;
    price: number;
    uploadedFile: { secure_url: string; public_id: string; }

}
const addMedicine = async (payload: MedicinePayload, userId: string) => {
    return await prisma.medicine.create({
        data: {
            authorId: userId,
            imageUrl: payload.uploadedFile.secure_url,
            imageCloudinaryId: payload.uploadedFile.public_id,
            name: payload.name,
            description: payload.description,
            categoryId: payload.categoryId,
            price: Number(payload.price)
        }
    });
}
const getAllMedicines = async (searchText: string, sortBy: Record<string, string | object>, page: number, limit: number, categoryId: string, storeId: string | null) => {
    const result = await prisma.medicine.findMany({
        where: {
            ...(storeId !== null && { authorId: storeId }),
            isBanned: false,
            name: {
                contains: searchText,
                mode: "insensitive"
            },
            ...(categoryId !== "all" && { category: { id: categoryId } })
        },
        include: {
            category: true,
            _count: {
                select: {
                    carts: {
                        where: {
                            orderId: { not: null }
                        }
                    },
                    reviews: true
                }
            }
        },

        orderBy: sortBy,
        skip: (page - 1) * limit,
        take: limit
    });
    const total = await prisma.medicine.count({
        where: {
            ...(storeId !== null && { authorId: storeId }),
            isBanned: false,
            name: {
                contains: searchText,
                mode: "insensitive"
            },
            ...(categoryId !== "all" && { category: { id: categoryId } })
        },
        orderBy: sortBy
    });
    return {
        data: result,
        meta: {
            total: total,
            page: page,
            limit: limit,
            totalPage: Math.ceil(total / limit)
        }
    }
}
const updateMedicine = async (payload: Partial<MedicinePayload>, medicineId: string, user: any) => {
    const medicine = await prisma.medicine.findUnique({
        where: {
            id: medicineId
        },
        select: {
            authorId: true
        }
    })

    if (!medicine) {
        throw new CustomError.NotFoundError("Unable to update your medicine! The medicine might no longer exist.");
    }
    if (medicine.authorId != user.id && user.role != UserRole.ADMIN) {
        throw new CustomError.PermissionError("Unable to update the medicine! Permission denied");
    }

    return await prisma.medicine.update({
        where: {
            id: medicineId
        },
        data: payload
    });
}
const deleteMedicine = async (medicineId: string, user: LoggedInUser) => {
    const medicine = await prisma.medicine.findUnique({
        where: {
            id: medicineId
        },
        select: {
            authorId: true
        }
    })

    if (!medicine) {
        throw new CustomError.NotFoundError("Unable to update your medicine! The medicine might no longer exist.");
    }
    if (medicine.authorId != user.id) {
        throw new CustomError.PermissionError("Unable to update the medicine! Permission denied");
    }

    return await prisma.medicine.delete({
        where: {
            id: medicineId
        }
    });
}

// Orders services
const getOrders = async (userId: string, status: OrderStatus | "ALL", sortby: "asc" | "desc") => {
    const orders = await prisma.order.findMany({
        where: {
            sellerId: userId,
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
            sellerId: userId
        },
        include: {
            carts: {
                include: {
                    medicine: {
                        select: {
                            id: true,
                            name: true,
                            imageUrl: true,
                            imageCloudinaryId: true,
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
const updateOrder = async (orderId: string, orderStatus: OrderStatus, userId: string) => {
    const order = await prisma.order.findUnique({
        where: {
            id: orderId,
            sellerId: userId
        },
        select: {
            customerId: true,
            status: true
        }
    });
    console.log(order);
    if (!order) {
        throw new CustomError.NotFoundError("Unable to update your order! The order might no longer exist.");
    }

    if (order.status == OrderStatus.CANCELLED) {
        throw new CustomError.PermissionError("Unable to update the order! Order is cancelled by customer");
    }

    return await prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            status: orderStatus
        }
    });
}

const sellerService = {
    addMedicine,
    updateMedicine,
    deleteMedicine,
    getAllMedicines,
    getOrders,
    getSingleOrder,
    updateOrder,
}
export default sellerService;