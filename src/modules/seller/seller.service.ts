import { Medicine, UserRole } from "../../../generated/prisma/client";
import CustomError from "../../helper/customError";
import { prisma } from "../../lib/prisma";
import { LoggedInUser } from "../../types/loggedInUser";

type MedicinePayload = {
    image: string;
    name: string;
    descriptions: string,
    categoryId: string;

}
const addMedicine = async (payload: MedicinePayload, userId: string) => {
    return await prisma.medicine.create({
        data: {
            authorId: userId,
            image: payload.image,
            name: payload.name,
            descriptions: payload.descriptions,
            categoryId: payload.categoryId,
        }
    });
}

const getAllMedicines = async (isBanned: boolean, searchText: string, sortby: "asc" | "desc", page: number, limit: number, category: string) => {
    const result = await prisma.medicine.findMany({
        where: {
            isBanned: isBanned,
            name: {
                contains: searchText,
                mode: "insensitive"
            },
            ...(category !== "ALL" && { category: { name: category } })
        },
        orderBy: {
            createdAt: sortby
        },
        skip: (page - 1) * limit,
        take: limit
    });
    const total = await prisma.medicine.count({
        where: {
            isBanned: isBanned,
            name: {
                contains: searchText,
                mode: "insensitive"
            },
            ...(category !== "ALL" && { category: { name: category } })
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

const sellerService = {
    addMedicine,
    updateMedicine,
    deleteMedicine,
    getAllMedicines,
}
export default sellerService;