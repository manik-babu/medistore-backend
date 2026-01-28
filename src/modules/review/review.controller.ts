import { Request, Response, NextFunction } from "express";
import { reviewsService } from "./review.service";
import { LoggedInUser } from "../../types/loggedInUser";

const addReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await reviewsService.addReview(req.body, req.user?.id as string);

        res.status(201).json({
            ok: true,
            message: "Reviews added",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}

const getReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const medicineId = req.params.medicineId as string;
        const sortby = (req.query.sortby as "asc" | "desc") || "desc";
        const page = Number(req.query.page) || 1;
        const limit = 10;
        const rating = req.query.rating ? Number(req.query.rating) : -1;


        const result = await reviewsService.getReviews(rating, sortby, page, limit, medicineId);

        res.status(200).json({
            ok: true,
            message: "All reviews retrived successfully",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
}
const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as LoggedInUser;
        const reviewId = req.params.reviewId as string;

        const result = await reviewsService.deleteReview(reviewId, user)

        res.status(200).json({
            ok: true,
            messgae: "Review deleted successfully",
            data: result
        })
    } catch (error: any) {
        next(error);
    }
}

export const reviewController = {
    addReview,
    getReviews,
    deleteReview,
}