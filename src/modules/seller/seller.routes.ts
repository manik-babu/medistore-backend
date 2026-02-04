import { Router } from "express";
import sellerController from "./seller.controller";
import { upload } from "../../configs/cloudinary";


//?  /api/seller
const router = Router();

router.post("/medicines", upload.single("image"), sellerController.addMedicine);
router.get("/medicines", sellerController.getAllMedicines)
router.put("/medicines/:medicineId", sellerController.updateMedicine);
router.delete("/medicines/:medicineId", sellerController.deleteMedicine);

router.get("/orders", sellerController.getOrders);
router.get("/orders/:orderId", sellerController.getSingleOrder)
router.patch("/orders/:orderId", sellerController.updateOrder)


export const sellerRoute = router;