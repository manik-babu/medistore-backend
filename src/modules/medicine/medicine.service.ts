import CustomError from "../../helper/customError";
import { prisma } from "../../lib/prisma";


const getAllMedicines = async (searchText: string, sortBy: Record<string, string | object>, page: number, limit: number, category: string, storeId: string | null) => {
    const result = await prisma.medicine.findMany({
        where: {
            ...(storeId !== null && { authorId: storeId }),
            isBanned: false,
            author: {
                isBanned: false
            },
            name: {
                contains: searchText,
                mode: "insensitive"
            },
            ...(category !== "All Categories" && { category: { name: category } })
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
            ...(category !== "All Categories" && { category: { name: category } })
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
                    email: true,
                    isBanned: true,
                }
            }
        },

    });

    if (!result) {
        throw new CustomError.NotFoundError("The medicine might no longer exist.");
    }

    const total = await prisma.review.aggregate({
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
        ratings: {
            total: total,
            single: ratingCount
        }
    };
}
type Categories = {
    id: string;
    name: string;
}
const getCategories = async () => {
    let categories = await prisma.category.findMany({
        orderBy: {
            name: "asc"
        }
    });
    categories.sort((a, b) => {
        if (a.name.toLowerCase() === "others") return 1;
        if (b.name.toLowerCase() === "others") return -1;
        return 0;
    });
    return categories;

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

const getFeaturedMedicines = async () => {
    return await prisma.medicine.findMany({
        where: {
            isFeatured: true
        },
        take: 5,
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
    })
}

export const medicineService = {
    getAllMedicines,
    getMedicineById,
    getCategories,
    getUserDetails,
    getFeaturedMedicines
}