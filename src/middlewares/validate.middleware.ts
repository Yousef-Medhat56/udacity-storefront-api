//This middleware runs after each middleware located in (middlewares/validators) directory

import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    //check if there is no errors
    if (errors.isEmpty()) {
        next();
    }
    //if there are errors
    else {
        //errors array
        const extractedErrors: object[] = [];
        errors
            .array({ onlyFirstError: true })
            .map((err) => extractedErrors.push({ [err.param]: err.msg }));

        res.status(400).json({
            errors: extractedErrors,
        });
    }
};

export default validate;
