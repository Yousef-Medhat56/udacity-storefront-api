import testProductsRoute from "./products/indexSpec";
import testUsersRoute from "./users/indexSpec";
import testOrdersRoute from "./orders/indexSpec";

import JwtHandler from "../../handlers/jwt.handler";
const jwt = new JwtHandler(); //JWT handler

describe("Test routes", () => {
    const validToken = jwt.sign({ id: 1 });
    const invalidToken = "this is an invalid token";

    testUsersRoute(validToken, invalidToken);
    testProductsRoute(validToken, invalidToken);
    testOrdersRoute(validToken);
});
