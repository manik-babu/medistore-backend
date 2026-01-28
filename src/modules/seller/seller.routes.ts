import { Router } from "express";
import auth from "../../middleware/auth";
import { UserRole } from "../../types/userRole";
import sellerController from "./seller.controller";


//?  /api/seller
const router = Router();

router.post("/medicines", auth(UserRole.SELLER), sellerController.addMedicine);


export const sellerRoute = router;