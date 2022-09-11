//check if the (:id) param is integer

import { param } from "express-validator";

const idParamValidationRules = () => {
    return [param("id").isInt({ min: 1 })];
};

export default idParamValidationRules;
