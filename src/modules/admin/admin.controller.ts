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


const adminController = {
    getAllUsers,
    addCategory
}
export default adminController;