import { Router } from "express";
import { reviewController } from "./review.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";

//? /api/reviews
const router = Router();

router.post("/", auth(UserRole.CUSTOMER), reviewController.addReview)
router.get("/:medicineId", reviewController.getReviews);
router.delete("/:reviewId", auth(UserRole.CUSTOMER), reviewController.deleteReview);
router.patch("/reply/:reviewId", auth(UserRole.SELLER), reviewController.reviewReply);

export const reviewRoute = router;