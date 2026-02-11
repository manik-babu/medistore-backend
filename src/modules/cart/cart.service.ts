import { Cart } from "../../../generated/prisma/client";
import CustomError from "../../helper/customError";
import { prisma } from "../../lib/prisma";


const addCart = async (payload: Pick<Cart, "medicineId" | "quantity">, userId: string) => {
    return await prisma.cart.create({
        data: {
            ...payload,
            authorId: userId
        }
    });
}
const getCart = async (userId: string) => {
    const result = await prisma.cart.findMany({
        where: {
            orderId: null,
            medicine: {
                isBanned: false
            }
        },
        select: {
            id: true,
            quantity: true,
            createdAt: true,
            medicine: {
                select: {
                    id: true,
                    name: true,
                    imageUrl: true,
                    price: true,
                    author: {
                        select: {
                            id: true,
                            storeName: true
                        }
                    }

                }

            }
        },
        orderBy: {
            createdAt: "asc"
        }
    });
    return result;
}
const deleteCart = async (cartId: string, userId: string) => {
    const result = await prisma.cart.findUnique({
        where: {
            id: cartId
        },
        select: {
            authorId: true
        }
    });
    if (!result) {
        throw new CustomError.NotFoundError("Unable to delete your cart! The cart might no longer exist.");
    }

    if (result.authorId != userId) {
        throw new CustomError.PermissionError("Unable to delete the cart! Permission denied");
    }

    return await prisma.cart.delete({
        where: {
            id: cartId
        }
    })
}
const updateCart = async (cartId: string, userId: string, quantity: number) => {
    const result = await prisma.cart.findUnique({
        where: {
            id: cartId
        },
        select: {
            authorId: true
        }
    });
    if (!result) {
        throw new CustomError.NotFoundError("Unable to update your cart! The cart might no longer exist.");
    }

    if (result.authorId != userId) {
        throw new CustomError.PermissionError("Unable to update the cart! Permission denied");
    }

    return await prisma.cart.update({
        where: {
            id: cartId
        },
        data: {
            quantity: quantity
        }
    });
}

export const cartService = {
    addCart,
    getCart,
    deleteCart,
    updateCart,
}