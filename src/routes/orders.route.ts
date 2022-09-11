import { Router } from "express";

// import middlewares - validators
import validate from "../middlewares/validate.middleware";
import orderValidationRules from "../middlewares/validators/orders.validator";

//import middlewares - authentication
import verifyToken from "../middlewares/auth.middleware";

//import controllers
import OrdersController from "../controllers/orders.controller";

const router = Router();

//orders controller
const controller = new OrdersController();

//get orders
router.get("/", verifyToken, controller.getOrders);

//add a product to the current order
router.post(
    "/products",
    verifyToken,
    orderValidationRules(),
    validate,
    controller.addProductToOrder
);

//change order status to complete
router.patch("/complete",verifyToken,controller.completeOrder)
export default router;
