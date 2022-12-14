import { Router } from "express";

// import middlewares - validators
import validate from "../middlewares/validate.middleware";
import idParamValidationRules from "../middlewares/validators/id-param.validator";

//import middlewares - authentication
import verifyToken from "../middlewares/auth.middleware";

//import controllers
import ProductsController from "../controllers/products.controller";
import productValidationRules from "../middlewares/validators/products.validator";

const router = Router();

//products controller
const controller = new ProductsController();

router.post(
    "/",
    verifyToken,
    productValidationRules(),
    validate,
    controller.create
);

//get all the products
router.get("/", controller.index);

// get top 5 most popular products
router.get("/top", controller.getTopProducts);

// get a specific product by id
router.get("/:id", idParamValidationRules(), validate, controller.show);

export default router;
