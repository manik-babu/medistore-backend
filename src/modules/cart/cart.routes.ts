import { Router } from "express";
import { cartController } from "./cart.controller";

//? /api/cart
const router = Router();

router.post("/", cartController.addCart);
router.get("/", cartController.getCart);
router.delete("/:cartId", cartController.deleteCart);
router.patch("/:cartId", cartController.updateCart);

export const cartRoute = router;