import { Router } from "express";
import { medicineController } from "./medicine.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";

//? /api
const router = Router();

router.get('/medicines', medicineController.getAllMedicines)
router.get("/medicines/:medicineId", medicineController.getMedicineById);
router.get("/categories", medicineController.getCategories);

router.get("/user/profile", auth(UserRole.CUSTOMER, UserRole.ADMIN, UserRole.SELLER), medicineController.getUserDetails)

export const medicineRoute = router;