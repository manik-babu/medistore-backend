import { Router } from "express";
import { orderController } from "./order.controller";

//? /api/orders
const router = Router();

router.post('/', orderController.addOrder);
router.get("/", orderController.getOrder);
router.patch("/:orderId", orderController.updateOrder);

export const orderRoute = router;