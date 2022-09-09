import testPostUserRoute from "./postSpec";
import testGetUserRoute from "./getSpec";
import testGetIdUserRoute from "./getIdSpec";

describe("Test (users) routes", () => {
    testPostUserRoute();
    testGetUserRoute();
    testGetIdUserRoute();
});
