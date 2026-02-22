import { UserRole } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

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
const changeRole = async (userId: string, storeName: string) => {
    return await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            role: UserRole.SELLER,
            storeName: storeName
        }
    });
}

export const userService = {
    getUserDetails,
    changeRole,
}