import testPostUserRoute from "./postSpec";
import testGetUserRoute from "./getSpec";
import testGetIdUserRoute from "./getIdSpec";

export default function testUsersRoute(
    validToken: string,
    inValidToken: string
) {
    describe("Test (users) routes", () => {
        testPostUserRoute(); //test POST /users
        testGetUserRoute(validToken, inValidToken); //test GET /users
        testGetIdUserRoute(validToken); //test GET /users/{user_id}
    });
}
