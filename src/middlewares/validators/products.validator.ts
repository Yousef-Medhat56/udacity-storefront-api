//validate the body request before creating a new prodcut

import { body } from "express-validator";

const productValidationRules = () => {
    return [
        // product name
        body("name").isString().withMessage("required"),
        // price
        body("price")
            .exists()
            .withMessage("required")
            .isInt({ min: 0 })
            .withMessage("invalid value"),
        // category
        body("category").isString().withMessage("required"),
    ];
};

export default productValidationRules;
