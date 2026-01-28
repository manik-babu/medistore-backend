import CustomError from "../../helper/customError";
import { prisma } from "../../lib/prisma";


const getAllMedicines = async (searchText: string, sortby: "asc" | "desc", page: number, limit: number, categoryId: string, storeId: string | null) => {
    const result = await prisma.medicine.findMany({
        where: {
            ...(storeId !== null && { authorId: storeId }),
            isBanned: false,
            name: {
                contains: searchText,
                mode: "insensitive"
            },
            ...(categoryId !== "ALL" && { category: { id: categoryId } })
        },
        include: {
            author: {
                select: {
                    id: true,
                    storeName: true,
                    image: true
                }
            },
            category: true
        },

        orderBy: {
            createdAt: sortby
        },
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
            ...(categoryId !== "ALL" && { category: { id: categoryId } })
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
const getMedicineById = async (medicineId: string) => {
    const result = await prisma.medicine.findUnique({
        where: {
            id: medicineId
        },
        include: {
            author: {
                select: {
                    id: true,
                    storeName: true,
                    image: true,
                }
            }
        }

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
        result,
        ratingAvgAndCount,
        ratingCount
    };
}

const getCategories = async () => {
    return await prisma.category.findMany();
}

export const medicineService = {
    getAllMedicines,
    getMedicineById,
    getCategories
}