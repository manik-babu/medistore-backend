import { Router } from "express";
import { userController } from "./user.controller";
import { upload } from "../../configs/cloudinary";

//? /api/user
const router = Router();
router.get("/profile", userController.getUserDetails);
router.patch("/change-role", userController.changeRole);
router.patch("/profile", userController.updateProfile);
router.post("/update/profile", upload.single("image"), userController.updateProfileImage);

export const userRoute = router;