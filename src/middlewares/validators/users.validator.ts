//validate the body request before creating a new user

import { body } from "express-validator";

const userValidationRules = () => {
    return [
        // first name
        body("first_name").isString().withMessage("required"),
        // last name
        body("last_name").isString().withMessage("required"),
        // password
        body("password")
            .isString()
            .withMessage("required")
            .isLength({ min: 4 })
            .withMessage("password must be 4 characters at minimum"),
    ];
};

export default userValidationRules;
