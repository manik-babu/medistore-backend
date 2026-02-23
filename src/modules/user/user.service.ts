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
type ProfileData = {
    name: string;
    age: number | null;
    contact: string | null;
    bio: string | null;
    storeName: string | null;

}
const updateProfile = async (userId: string, data: ProfileData) => {
    return await prisma.user.update({
        where: {
            id: userId
        },
        data
    });
}

export const userService = {
    getUserDetails,
    changeRole,
    updateProfile,
}