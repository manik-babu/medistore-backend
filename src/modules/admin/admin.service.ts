import { OrderStatus, UserRole } from "../../../generated/prisma/enums"
import CustomError from "../../helper/customError";
import { prisma } from "../../lib/prisma";

type GetAllUsersPayload = {
    role: UserRole | "All";
    isBanned: boolean;
    searchText: string;
    page: number,
    limit: number
}

const getAllUsers = async (payload: GetAllUsersPayload) => {
    const data = await prisma.user.findMany({
        where: {
            ...(payload.role !== "All" && { role: payload.role }),
            isBanned: payload.isBanned,
            OR: [
                {
                    name: {
                        contains: payload.searchText,
                        mode: "insensitive"
                    }
                },
                {
                    email: {
                        contains: payload.searchText,
                        mode: "insensitive"
                    }
                },
                {
                    storeName: {
                        contains: payload.searchText,
                        mode: "insensitive"
                    }
                },
            ]
        },
        skip: (payload.page - 1) * payload.limit,
        take: payload.limit
    });

    const total = await prisma.user.count({
        where: {
            ...(payload.role !== "All" && { role: payload.role }),
            isBanned: payload.isBanned,
            OR: [
                {
                    name: {
                        contains: payload.searchText,
                        mode: "insensitive"
                    }
                },
                {
                    email: {
                        contains: payload.searchText,
                        mode: "insensitive"
                    }
                }
            ]
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

const getStatics = async () => {
    const [totalCustomer, bannedCustomer, totalSeller, bannedSeller, totalMedicine, bannedMedicine, featuredMedicine, totalOrder, processingOrders, shippedOrders, deliveredOrders, cancelledOrders] = await prisma.$transaction([
        prisma.user.count({
            where: {
                role: UserRole.CUSTOMER
            }
        }),
        prisma.user.count({
            where: {
                role: UserRole.CUSTOMER,
                isBanned: true
            }
        }),
        // Sellers
        prisma.user.count({
            where: {
                role: UserRole.SELLER
            }
        }),
        prisma.user.count({
            where: {
                role: UserRole.SELLER,
                isBanned: true
            }
        }),
        // Medicines
        prisma.medicine.count(),
        prisma.medicine.count({
            where: {
                isBanned: true
            }
        }),
        prisma.medicine.count({
            where: {
                isFeatured: true
            }
        }),
        // Orders
        prisma.order.count(),
        prisma.order.count({
            where: {
                status: OrderStatus.PROCESSING
            }
        }),
        prisma.order.count({
            where: {
                status: OrderStatus.SHIPPED
            }
        }),
        prisma.order.count({
            where: {
                status: OrderStatus.DELIVERED
            }
        }),
        prisma.order.count({
            where: {
                status: OrderStatus.CANCELLED
            }
        }),
    ]);
    const data = {
        customer: {
            total: totalCustomer,
            banned: bannedCustomer
        },
        seller: {
            total: totalSeller,
            banned: bannedSeller
        },
        medicine: {
            total: totalMedicine,
            featured: featuredMedicine,
            banned: bannedMedicine
        },
        order: {
            total: totalOrder,
            processing: processingOrders,
            shipped: shippedOrders,
            delivered: deliveredOrders,
            cancelled: cancelledOrders
        }
    }
    return data;
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

const getAllMedicines = async (searchText: string, isBanned: boolean, isFeatured: boolean, sortBy: Record<string, string | object>, page: number, limit: number, category: string, storeId: string | null) => {
    const result = await prisma.medicine.findMany({
        where: {
            ...(storeId !== null && { authorId: storeId }),
            isBanned: isBanned,
            isFeatured: isFeatured,
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
                    image: true,
                    email: true
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

const adminService = {
    getAllUsers,
    addCategory,
    updateUser,
    updateMedicine,
    getStatics,
    getUserDetails,
    getAllMedicines,
}
export default adminService;