import testGetIdProductsRoute from "./getIdSpec";
import testGetProductsRoute from "./getSpec";
import testPostProductsRoute from "./postSpec";

export default function testProductsRoute(
    validToken: string,
    inValidToken: string
) {
    describe("Test (products) routes", () => {
        testPostProductsRoute(validToken, inValidToken); //test POST /products
        testGetProductsRoute(); //test GET /products
        testGetIdProductsRoute(); //test GET /products/{product_id}
    });
}
