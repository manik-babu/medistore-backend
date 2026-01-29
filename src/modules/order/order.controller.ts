import { Request, Response, NextFunction } from "express";
import { orderService } from "./order.service";
import { OrderStatus } from "../../../generated/prisma/enums";

const addOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await orderService.addOrder(req.body, req.user?.id as string)

        res.status(201).json({
            ok: true,
            message: "Order created",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}
const getOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sortby = (req.query.sortby as "asc" | "desc") || "desc";
        const status: OrderStatus | "ALL" = req.query.status as OrderStatus || "ALL";
        const result = await orderService.getOrder(req.user?.id as string, sortby, status);

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
        const result = await orderService.getSingleOrder(req.params.orderId as string, req.user?.id as string)

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
        const result = await orderService.updateOrder(req.params.orderId as string, req.user?.id as string)

        res.status(200).json({
            ok: true,
            message: "Order cancelled",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}


export const orderController = {
    addOrder,
    getOrder,
    updateOrder,
    getSingleOrder,
}