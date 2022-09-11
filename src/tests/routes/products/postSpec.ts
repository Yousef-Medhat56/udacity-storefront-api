import supertest from "supertest";
import app from "../../../server";

//create request object
const request = supertest(app);

export default function testPostProductsRoute(
    validToken: string,
    inValidToken: string
) {
    describe("Test: POST /products", () => {
        it("send RIGHT body request with the authentication header", async () => {
            const response = await request
                .post("/products")
                .send({
                    name: "watermelon",
                    price: 10,
                    category: "fruits",
                })
                .set("Authorization", "Bearer " + validToken);

            expect(response.status).toBe(200);
        });
        it("send BAD body request", async () => {
            const response = await request
                .post("/products")
                // missing the product name
                .send({
                    price: 10,
                    category: "fruits",
                })
                .set("Authorization", "Bearer " + validToken);

            expect(response.status).toBe(400);
        });
        it("send invalid authentication header", async () => {
            const response = await request
                .post("/products")
                // missing the product name
                .send({
                    name: "watermelon",
                    price: 10,
                    category: "fruits",
                })
                .set("Authorization", "Bearer " + inValidToken);

            expect(response.status).toBe(401);
        });
    });
}
