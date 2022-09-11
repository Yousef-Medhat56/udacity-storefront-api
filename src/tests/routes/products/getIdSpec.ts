import supertest from "supertest";
import app from "../../../server";

//create request object
const request = supertest(app);

export default function testGetIdProductsRoute() {
    describe("Test: GET /products/{product_id}", () => {
        it("test entering a valid and existed product id", async () => {
            const response = await request.get("/products/1");
            expect(response.status).toBe(200);
            expect(response.body.data).toEqual(
                jasmine.objectContaining({ id: 1 })
            );
        });
        it("test entering a non existent product id", async () => {
            const response = await request.get("/products/10000");
            expect(response.status).toBe(404);
        });
        it("test entering an invalid value for product id", async () => {
            const response = await request.get("/products/abc");
            expect(response.status).toBe(400);
        });
    });
}
