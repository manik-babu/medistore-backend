import { Router } from "express";
import adminController from "./admin.controller";

//? /api/admin
const router = Router();

router.get("/users", adminController.getAllUsers);
router.patch("/users/:userId", adminController.updateUser)
router.patch("/medicines/:medicineId", adminController.updateMedicine)
router.post("/category", adminController.addCategory);


export const adminRoute = router;