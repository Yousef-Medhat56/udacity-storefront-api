//validate the body request before creating a new record in the products_orders table

import { body } from "express-validator";

const orderValidationRules = () => {
    return [
        // product id
        body("product_id")
            .exists()
            .withMessage("required")
            .isInt({ min: 1 })
            .withMessage("invalid value"),
        // quantity
        body("quantity")
            .exists()
            .withMessage("required")
            .isInt({ min: 1 })
            .withMessage("invalid value"),
    ];
};

export default orderValidationRules;
