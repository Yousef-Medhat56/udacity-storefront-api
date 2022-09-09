import { Router } from "express";

//import controllers
import UsersController from "../controllers/users.controller";

// import middlewares - validators
import validate from "../middlewares/validate.middleware";
import idParamValidationRules from "../middlewares/validators/id-param.validator";
import userValidationRules from "../middlewares/validators/users.validator";

//import middlewares - authentication
import verifyToken from "../middlewares/auth.middleware";

const router = Router();

//users controller
const controller = new UsersController();

//get all the users
router.get("/", verifyToken, controller.index);

//get a specific user by id
router.get(
    "/:id",
    idParamValidationRules(),
    validate,
    verifyToken,
    controller.show
);

//create a new user
router.post("/", userValidationRules(), validate, controller.create);

export default router;
