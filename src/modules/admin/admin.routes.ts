import { Router } from "express";
import adminController from "./admin.controller";

//? /api/admin
const router = Router();

router.get("/users", adminController.getAllUsers);
router.post("/category", adminController.addCategory)


export const adminRoute = router;