import { Router } from "express";
import sellerController from "./seller.controller";


//?  /api/seller
const router = Router();

router.post("/medicines", sellerController.addMedicine);
router.get("/medicines", sellerController.getAllMedicines)
router.put("/medicines/:medicineId", sellerController.updateMedicine);
router.delete("/medicines/:medicineId", sellerController.deleteMedicine);



export const sellerRoute = router;