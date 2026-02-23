import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";

const getUserDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.getUserDetails(req.user?.id as string);
        res.status(200).json({
            ok: true,
            message: "Details retrived successfully",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}
const changeRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.changeRole(req.user?.id as string, req.body.storeName);
        res.status(200).json({
            ok: true,
            message: "Role updated successfully",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}
const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.updateProfile(req.user?.id as string, req.body);
        res.status(200).json({
            ok: true,
            message: "Profile updated successfully",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}

export const userController = {
    getUserDetails,
    changeRole,
    updateProfile,
}