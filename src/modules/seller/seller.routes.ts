import { Router } from "express";
import sellerController from "./seller.controller";


//?  /api/seller
const router = Router();

router.post("/medicines", sellerController.addMedicine);
router.put("/medicines/:medicineId", sellerController.updateMedicine);



export const sellerRoute = router;