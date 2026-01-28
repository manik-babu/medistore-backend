import { Request, Response, NextFunction } from "express";
import { medicineService } from "./medicine.service";

const getAllMedicines = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const searchText = req.query.searchText as string || "";
        const sortby = (req.query.sortby as "asc" | "desc") || "desc";
        const page = Number(req.query.page) || 1;
        const limit = 10;
        const category = req.query.category as string || "ALL";
        const storeId: string | null = req.query.storeId as string || null;

        const result = await medicineService.getAllMedicines(searchText, sortby, page, limit, category, storeId)

        res.status(200).json({
            ok: true,
            message: "All medicine retrived successfully",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}

const getMedicineById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await medicineService.getMedicineById(req.params.medicineId as string);
        res.status(200).json({
            ok: true,
            message: "All medicine retrived successfully",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}

const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await medicineService.getCategories();
        res.status(200).json({
            ok: true,
            message: "All categories retrived successfully",
            data: result
        })
    } catch (error: any) {
        next(error);
    }
}
export const medicineController = {
    getAllMedicines,
    getMedicineById,
    getCategories,
}