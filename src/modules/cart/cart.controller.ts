import { NextFunction, Request, Response } from "express";
import { cartService } from "./cart.service";


const addCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await cartService.addCart(req.body, req.user?.id as string);

        res.status(201).json({
            ok: true,
            message: "Cart added",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}

const getCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await cartService.getCart(req.user?.id as string);

        res.status(200).json({
            ok: true,
            message: "All cart retrived successfully",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}
const deleteCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await cartService.deleteCart(req.params.cartId as string, req.user?.id as string);

        res.status(200).json({
            ok: true,
            message: "Cart deleted",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}

const updateCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await cartService.updateCart(req.params.cartId as string, req.user?.id as string, req.body.quantity);

        res.status(200).json({
            ok: true,
            message: "Cart updated",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}

export const cartController = {
    addCart,
    getCart,
    deleteCart,
    updateCart
}