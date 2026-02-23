import { Router } from "express";
import { userController } from "./user.controller";

//? /api/user
const router = Router();
router.get("/profile", userController.getUserDetails);
router.patch("/change-role", userController.changeRole);
router.patch("/profile", userController.updateProfile);

export const userRoute = router;