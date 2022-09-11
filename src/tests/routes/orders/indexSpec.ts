import testGetOrdersRoute from "./getSpec";
import testPostOrderProductRoute from "./products/postSpec";
import testPatchOrdersRoute from "./patchSpec";

export default function testOrdersRoute(validToken: string) {
    describe("Test (orders) routes", () => {
        testGetOrdersRoute(validToken); //test POST /users
        testPostOrderProductRoute(validToken); //test GET /users
        testPatchOrdersRoute(validToken); //test GET /users/{user_id}
    });
}
