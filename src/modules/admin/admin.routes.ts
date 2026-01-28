import { Router } from "express";
import auth from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import adminController from "./admin.controller";

//? /api/admin
const router = Router();

router.get("/users", auth(UserRole.ADMIN), adminController.getAllUsers);
router.post("/category", auth(UserRole.ADMIN), adminController.addCategory)


export const adminRoute = router;