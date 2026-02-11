import CustomError from "../../helper/customError";
import { prisma } from "../../lib/prisma";


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
            author: {
                select: {
                    id: true,
                    storeName: true,
                    image: true
                }
            },
            category: true,
            _count: {
                select: {
                    carts: {
                        where: {
                            orderId: { not: null }
                        }
                    }
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
const getMedicineById = async (medicineId: string) => {
    const result = await prisma.medicine.findUnique({
        where: {
            id: medicineId
        },
        include: {
            category: true,
            _count: {
                select: {
                    carts: {
                        where: {
                            orderId: { not: null }
                        }
                    }
                }
            },
            author: {
                select: {
                    id: true,
                    storeName: true,
                    image: true,
                }
            }
        },

    });

    if (!result) {
        throw new CustomError.NotFoundError("Unable to update your medicine! The medicine might no longer exist.");
    }

    const ratingAvgAndCount = await prisma.review.aggregate({
        where: {
            medicineId: medicineId
        },
        _avg: {
            rating: true
        },
        _count: true,
    });
    const ratingCount = await prisma.review.groupBy({
        by: ["rating"],
        where: {
            medicineId: medicineId
        },
        _count: true
    });

    return {
        medicine: result,
        ratingAvgAndCount,
        ratingCount
    };
}

const getCategories = async () => {
    return await prisma.category.findMany();
}

const getUserDetails = async (userId: string) => {
    return await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            _count: {
                select: {
                    carts: {
                        where: {
                            orderId: null
                        }
                    }
                }
            }
        }
    });
}

export const medicineService = {
    getAllMedicines,
    getMedicineById,
    getCategories,
    getUserDetails,
}