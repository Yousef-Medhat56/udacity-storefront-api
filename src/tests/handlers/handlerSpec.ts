import testPasswordHandler from "./passwordSpec";
import testJwtHandler from "./jwtSpec";

describe("Test Handlers", () => {
    testPasswordHandler(); //Password handler suite
    testJwtHandler(); //JWT handler suite
});
