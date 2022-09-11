import supertest from "supertest";
import app from "../../../server";

//create request object
const request = supertest(app);

export default function testGetProductsRoute() {
    describe("Test: GET /products", () => {
        it("should return a list of products", async () => {
            const response = await request.get("/products");
            expect(response.status).toBe(200);
            expect(response.body.data).toBeTruthy();
        });
        it("should return a list of the top 5 most popular products", async () => {
            const response = await request.get("/products/top");
            expect(response.status).toBe(200);
            expect(response.body.data).toBeTruthy();
            //the products array length should be 5 or less
            expect(response.body.data.length).toBeLessThanOrEqual(5);
        });
    });
}
