import { Medicine } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

type AddMedicinePayload = {
    image: string;
    name: string;
    descriptions: string,
    categoryId: string;

}
const addMedicine = async (payload: AddMedicinePayload, userId: string) => {
    return await prisma.medicine.create({
        data: {
            userId: userId,
            image: payload.image,
            name: payload.name,
            descriptions: payload.descriptions,
            categoryId: payload.categoryId,
        }
    });
}

const sellerService = {
    addMedicine,
}
export default sellerService;