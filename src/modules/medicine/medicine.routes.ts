import { Router } from "express";
import { medicineController } from "./medicine.controller";

//? /api/medicines

const router = Router();

router.get('/', medicineController.getAllMedicines)
router.get("/:medicineId", medicineController.getMedicineById);
router.get("/all/category", medicineController.getCategories)

export const medicineRoute = router;