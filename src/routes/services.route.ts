import { Router } from "express";
import ServicesController from "../controllers/services.controller";
import verifyToken from "../middlewares/auth.middleware";
const controller = new ServicesController();
const router = Router();

//complete the order (chnage order status to "completed")
router.put("/order-completed", verifyToken, controller.controlCompleteOrder);

export default router;
