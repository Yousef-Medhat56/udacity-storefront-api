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

//add a record in the products_orders table
router.put(
    "/",
    verifyToken,
    orderValidationRules(),
    validate,
    controller.addProductToOrder
);

router.get("/", verifyToken, controller.getOrders);
export default router;
