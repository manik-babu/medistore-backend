import { UserRole } from "../../../generated/prisma/enums"
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
        skip: (payload.page - 1) * 10,
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

const adminService = {
    getAllUsers,
    addCategory,
}
export default adminService;