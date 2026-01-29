import { NextFunction, Request, Response } from "express";
import adminService from "./admin.service";
import { UserRole } from "../../../generated/prisma/enums";


const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const role = req.query.role as UserRole || UserRole.CUSTOMER;
        const isBanned = (req.query.isBanned as string)?.toLowerCase() === "true" || false;
        const searchText = req.query.searchText as string || "";
        const page = Number(req.query.page) || 1;
        const limit = 10;
        const result = await adminService.getAllUsers({ role, isBanned, searchText, page, limit });

        res.status(200).json({
            ok: true,
            message: "All user retrived successfully",
            data: result
        })
    } catch (error: any) {
        next(error);
    }
}

const addCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await adminService.addCategory(req.body);

        res.status(201).json({
            ok: true,
            message: "Category add successfully",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await adminService.updateUser(req.params.userId as string, req.body.isBanned);

        res.status(200).json({
            ok: true,
            message: "User update successfull",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}
const updateMedicine = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await adminService.updateMedicine(req.params.medicineId as string, req.body);

        res.status(200).json({
            ok: true,
            message: "Medicine update successfull",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}

const adminController = {
    getAllUsers,
    addCategory,
    updateUser,
    updateMedicine,
}
export default adminController;