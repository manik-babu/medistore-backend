import { Request, Response, NextFunction } from "express";
import sellerService from "./seller.service";


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

const sellerController = {
    addMedicine,
}
export default sellerController;