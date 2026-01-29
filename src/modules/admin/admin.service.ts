import { UserRole } from "../../../generated/prisma/enums"
import CustomError from "../../helper/customError";
import { prisma } from "../../lib/prisma";

type GetAllUsersPayload = {
    role: UserRole;
    isBanned: boolean;
    searchText: string;
    page: number,
    limit: number
}

const getAllUsers = async (payload: GetAllUsersPayload) => {
    const data = await prisma.user.findMany({
        where: {
            role: payload.role,
            isBanned: payload.isBanned,
            name: {
                contains: payload.searchText,
                mode: "insensitive"
            }
        },
        skip: (payload.page - 1) * payload.limit,
        take: payload.limit
    });

    const total = await prisma.user.count({
        where: {
            role: payload.role,
            isBanned: payload.isBanned,
            name: {
                contains: payload.searchText,
                mode: "insensitive"
            }
        }
    });

    return {
        data,
        meta: {
            total,
            page: payload.page,
            limit: payload.limit,
            totalPage: Math.ceil(total / payload.limit)
        }
    }


}

const addCategory = async ({ name }: { name: string }) => {
    return await prisma.category.create({
        data: {
            name: name
        }
    });
}
const updateUser = async (userId: string, isBanned: boolean) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
        }
    })
    if (!user) {
        throw new CustomError.NotFoundError("Unable to update user! The user might no longer exist.");
    }

    return await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            isBanned: isBanned
        }
    });
}
const updateMedicine = async (medicineId: string, data: { isBanned?: boolean; isFeatured?: boolean }) => {
    const medicine = await prisma.medicine.findUnique({
        where: {
            id: medicineId
        },
        select: {
            id: true,
        }
    });
    console.log(medicine)
    if (!medicine) {
        throw new CustomError.NotFoundError("Unable to update the medicine! The medicine might no longer exist.");
    }

    return await prisma.medicine.update({
        where: {
            id: medicineId
        },
        data: data
    });
}

const adminService = {
    getAllUsers,
    addCategory,
    updateUser,
    updateMedicine,
}
export default adminService;