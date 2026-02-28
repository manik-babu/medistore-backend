import { NextFunction, Request, Response } from "express";
import adminService from "./admin.service";
import { UserRole } from "../../../generated/prisma/enums";


const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const role = req.query.role || "All";
        const isBanned = (req.query.banned as string)?.toLowerCase() === "true" || false;
        const searchText = req.query.searchText as string || "";
        const page = Number(req.query.page) || 1;
        const limit = 10;
        const result = await adminService.getAllUsers({ role: role as UserRole | "All", isBanned, searchText, page, limit });

        res.status(200).json({
            ok: true,
            message: "All user retrieved successfully",
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
            message: "User update successful",
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
            message: "Medicine update successful",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}

const getStatics = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await adminService.getStatics();
        res.status(200).json({
            ok: true,
            message: "Data retrieved",
            data: result
        });

    } catch (error: any) {
        next(error);
    }
}

const getUserDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await adminService.getUserDetails(req.params.userId as string);
        res.status(200).json({
            ok: true,
            message: "Details retrieved successfully",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}

const getAllMedicines = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const searchText = req.query.searchText as string || "";
        const page = Number(req.query.page) || 1;
        const isBanned = (req.query.banned as string) === "true" || false;
        const isFeatured = (req.query.featured as string) === "true" || false;
        const limit = 5;
        const category: string | null = req.query.category as string || "All Categories";
        const storeId: string | null = req.query.storeId as string || null;

        let sortByValue = (req.query.sortBy as string) || "relevance";
        let sortBy;
        if (sortByValue === "price-low") {
            sortBy = {
                price: "asc"
            }
        }
        else if (sortByValue === "price-high") {
            sortBy = {
                price: "desc"
            }
        }
        else if (sortByValue === "newest") {
            sortBy = {
                createdAt: "asc"
            }
        }
        else if (sortByValue === "popular") {
            sortBy = {
                carts: {
                    _count: "desc"
                }
            }
        }
        else {
            sortBy = {
                createdAt: "desc"
            }
        }
        const result = await adminService.getAllMedicines(searchText, isBanned, isFeatured, sortBy, page, limit, category, storeId)

        res.status(200).json({
            ok: true,
            message: "All medicine retrieved successfully",
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
    getStatics,
    getUserDetails,
    getAllMedicines,
}
export default adminController;