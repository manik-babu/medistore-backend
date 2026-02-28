import { Router } from "express";
import adminController from "./admin.controller";

//? /api/admin
const router = Router();

router.get("/users", adminController.getAllUsers);
router.get("/users/:userId", adminController.getUserDetails);
router.patch("/users/:userId", adminController.updateUser)

router.get('/medicines', adminController.getAllMedicines)
router.patch("/medicines/:medicineId", adminController.updateMedicine)

router.post("/category", adminController.addCategory);
router.get("/statics", adminController.getStatics)

export const adminRoute = router;