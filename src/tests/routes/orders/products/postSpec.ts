import supertest from "supertest";
import app from "../../../../server";

//create request object
const request = supertest(app);

export default function testPostOrderProductRoute(token: string) {
    describe("Test: POST /orders/products", () => {
        it("send RIGHT body request", async () => {
            const response = await request
                .post("/orders/products")
                .send({ product_id: 1, quantity: 2 })
                .set("Authorization", "Bearer " + token);
            expect(response.status).toBe(200);
            expect(response.body.data.products).toContain(
                jasmine.objectContaining({ product_id: 1, quantity: 2 })
            );
        });
        it("send BAD body request", async () => {
            const response = await request
                .post("/orders/products")
                .send({ quantity: 2 }) //missing the product id
                .set("Authorization", "Bearer " + token);
            expect(response.status).toBe(400);
        });
    });
}
