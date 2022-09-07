import testUserModel from "./userSpec";
import testProductModel from "./productSpec";
import testOrderModel from "./orderSpec";

describe("Test Models", () => {
    testUserModel(); //User model suite
    testProductModel(); //Product model suite
    testOrderModel(); //Order model suite
});
