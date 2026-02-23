import { Request, Response, NextFunction } from "express";
import { medicineService } from "./medicine.service";

const getAllMedicines = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const searchText = req.query.searchText as string || "";
        const page = Number(req.query.page) || 1;
        const limit = 5;
        const categoryId: string | null = req.query.categoryId as string || "all";
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
        const result = await medicineService.getAllMedicines(searchText, sortBy, page, limit, categoryId, storeId)

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

const getUserDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await medicineService.getUserDetails(req.user?.id as string);
        res.status(200).json({
            ok: true,
            message: "Details retrived successfully",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}
export const medicineController = {
    getAllMedicines,
    getMedicineById,
    getCategories,
    getUserDetails,
}