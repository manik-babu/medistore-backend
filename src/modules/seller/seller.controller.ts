import { Request, Response, NextFunction } from "express";
import sellerService from "./seller.service";
import CustomError from "../../helper/customError";
import { UserRole } from "../../../generated/prisma/enums";
import { LoggedInUser } from "../../types/loggedInUser";


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
const getAllMedicines = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isBanned = req.query.isBanned ? req.query.isBanned === "true" : false;
        const searchText = req.query.searchText as string || "";
        const sortby = (req.query.sortby as "asc" | "desc") || "desc";
        const page = Number(req.query.page) || 1;
        const limit = 10;
        const category = req.query.category as string || "ALL"

        const result = await sellerService.getAllMedicines(isBanned, searchText, sortby, page, limit, category);

        res.status(200).json({
            ok: true,
            message: "All medicine retrived successfully",
            data: result
        });
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
const deleteMedicine = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as LoggedInUser;
        const medicineId = req.params.medicineId as string;

        const result = await sellerService.deleteMedicine(medicineId, user);

        res.status(200).json({
            ok: true,
            messgae: "Medicine deleted successfully",
            data: result
        })
    } catch (error: any) {
        next(error);
    }
}

const sellerController = {
    addMedicine,
    updateMedicine,
    deleteMedicine,
    getAllMedicines,
}
export default sellerController;