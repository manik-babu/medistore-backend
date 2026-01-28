import { Router } from "express";
import { medicineController } from "./medicine.controller";

//? /api
const router = Router();

router.get('/medicines', medicineController.getAllMedicines)
router.get("/medicines/:medicineId", medicineController.getMedicineById);
router.get("/category", medicineController.getCategories);

export const medicineRoute = router;