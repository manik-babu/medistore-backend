import { Router } from "express";
import { userController } from "./user.controller";

//? /api/user
const router = Router();
router.get("/profile", userController.getUserDetails);
router.patch("/change-role", userController.changeRole);

export const userRoute = router;