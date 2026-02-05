import { Request, Response, NextFunction } from "express";
import sellerService from "./seller.service";
import CustomError from "../../helper/customError";
import { OrderStatus, UserRole } from "../../../generated/prisma/enums";
import { LoggedInUser } from "../../types/loggedInUser";
import { uploadToCloudinary } from "../../configs/cloudinary";


const addMedicine = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                ok: false,
                message: "Mediceine upload failed",
                error: "No image found"
            });
        }
        const uploadedFile = await uploadToCloudinary(req.file.buffer);

        const result = await sellerService.addMedicine({ ...req.body, uploadedFile }, req.user?.id!)

        res.status(201).json({
            ok: true,
            message: "Medicine added successfully",
            data: result
        })
    } catch (error: any) {
        console.log(error);
        next(error);
    }
}

const getAllMedicines = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const searchText = req.query.searchText as string || "";
        const page = Number(req.query.page) || 1;
        const limit = 2;
        const categoryId: string | null = req.query.categoryId as string || "all";
        const storeId: string | null = req.user?.id as string;

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
        const result = await sellerService.getAllMedicines(searchText, sortBy, page, limit, categoryId, storeId)

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
            message: "Medicine updated successfully",
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
            message: "Medicine deleted successfully",
            data: result
        })
    } catch (error: any) {
        next(error);
    }
}

// Orders controller
const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sortby = (req.query.sortby as "asc" | "desc") || "desc";
        const status: OrderStatus | "ALL" = req.query.status as OrderStatus || "ALL";
        const result = await sellerService.getOrders(req.user?.id as string, status, sortby);

        res.status(200).json({
            ok: true,
            message: "All orders retrived successfully",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}
const getSingleOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await sellerService.getSingleOrder(req.params.orderId as string, req.user?.id as string)

        res.status(200).json({
            ok: true,
            message: "Order retrived successfully",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}
const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { orderStatus } = req.body;
        const result = await sellerService.updateOrder(req.params.orderId as string, orderStatus, req.user?.id as string)

        res.status(200).json({
            ok: true,
            message: `Order update to ${orderStatus}`,
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}

const sellerController = {
    addMedicine,
    updateMedicine,
    deleteMedicine,
    getAllMedicines,
    getOrders,
    getSingleOrder,
    updateOrder,
}
export default sellerController;