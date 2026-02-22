import { Review } from "../../../generated/prisma/client";
import CustomError from "../../helper/customError";
import { prisma } from "../../lib/prisma";
import { LoggedInUser } from "../../types/loggedInUser";


const addReview = async (payload: Pick<Review, "medicineId" | "content" | "rating">, userId: string) => {
    const isOrdered = await prisma.order.count({
        where: {
            customerId: userId,
            status: "DELIVERED",
            carts: {
                some: {
                    medicineId: payload.medicineId
                }
            }
        }
    })

    if (isOrdered === 0) {
        throw new CustomError.PermissionError("You can only review purchased medicines.");
    }

    const result = await prisma.review.create({
        data: {
            ...payload,
            authorId: userId
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    image: true
                }
            }
        }
    });
    return result;
}

const getReviews = async (rating: number, sortby: "asc" | "desc", page: number, limit: number, medicineId: string) => {
    const result = await prisma.review.findMany({
        where: {
            medicineId,
            ...(rating !== -1 && { rating })
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                }
            },
            medicine: {
                select: {
                    authorId: true
                }
            }
        },
        orderBy: {
            createdAt: sortby
        },
        skip: (page - 1) * limit,
        take: limit
    });
    const total = await prisma.review.count({
        where: {
            medicineId,
            ...(rating !== -1 && { rating })
        },
        orderBy: {
            createdAt: sortby
        },
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

const deleteReview = async (reviewId: string, user: LoggedInUser) => {
    const review = await prisma.review.findUnique({
        where: {
            id: reviewId
        },
        select: {
            authorId: true
        }
    })

    if (!review) {
        throw new CustomError.NotFoundError("Unable to delete your review! The review might no longer exist.");
    }
    if (review.authorId != user.id) {
        throw new CustomError.PermissionError("Unable to delete the review! Permission denied");
    }

    return await prisma.review.delete({
        where: {
            id: reviewId
        }
    });
}

const reviewReply = async (reviewId: string, data: string, sellerId: string) => {
    const review = await prisma.review.findUnique({
        where: {
            id: reviewId
        },
        select: {
            medicine: {
                select: {
                    authorId: true
                }
            }
        }
    });
    if (!review) {
        throw new CustomError.NotFoundError("Unable to reply the review! The review might no longer exist.");
    }

    if (review.medicine.authorId !== sellerId) {
        throw new CustomError.PermissionError("Unable to reply the review! Permission denied");
    }

    return await prisma.review.update({
        where: {
            id: reviewId
        },
        data: {
            storeReply: data
        }
    });

}


export const reviewsService = {
    addReview,
    getReviews,
    deleteReview,
    reviewReply,
}