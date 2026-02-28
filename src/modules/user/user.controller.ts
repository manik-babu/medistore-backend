import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { uploadToCloudinary } from "../../configs/cloudinary";

const getUserDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.getUserDetails(req.user?.id as string);
        res.status(200).json({
            ok: true,
            message: "Details retrieved successfully",
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

const updateProfileImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                ok: false,
                message: "Profile upload failed",
                error: "No image found"
            });
        }
        const image = await uploadToCloudinary(req.file.buffer, "Profiles");
        const result = await userService.updateProfileImage(req.user?.id as string, image.secure_url);
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
    updateProfileImage,
}