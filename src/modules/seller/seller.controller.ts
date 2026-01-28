import { Request, Response, NextFunction } from "express";
import sellerService from "./seller.service";
import CustomError from "../../helper/customError";
import { UserRole } from "../../../generated/prisma/enums";


const addMedicine = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await sellerService.addMedicine(req.body, req.user?.id!)

        res.status(201).json({
            ok: true,
            message: "Medicine added successfully",
            data: result
        })
    } catch (error: any) {
        next(error);
    }
}

const updateMedicine = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user!;
        const medicineId = req.params.medicineId as string;
        const data = req.body;

        if ((data.isBanned !== undefined || data.isFeatured !== undefined) && user.role != UserRole.ADMIN) {
            throw new CustomError.PermissionError("Unable to update the medicine! Permission denied");
        }

        const result = await sellerService.updateMedicine(data, medicineId, user);

        res.status(200).json({
            ok: true,
            messgae: "Medicine updated successfully",
            data: result
        })
    } catch (error: any) {
        next(error);
    }
}

const sellerController = {
    addMedicine,
    updateMedicine,
}
export default sellerController;