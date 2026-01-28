import { Medicine, UserRole } from "../../../generated/prisma/client";
import CustomError from "../../helper/customError";
import { prisma } from "../../lib/prisma";

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

const sellerService = {
    addMedicine,
    updateMedicine,
}
export default sellerService;