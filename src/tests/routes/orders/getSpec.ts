import supertest from "supertest";
import app from "../../../server";

//create request object
const request = supertest(app);

export default function testGetOrdersRoute(token: string) {
    describe("Test: GET /orders", () => {
        it("should return a list of all the orders made by the user", async () => {
            const response = await request
                .get("/orders")
                .set("Authorization", "Bearer " + token);
            console.log(response.body);
            expect(response.status).toBe(200);
            expect(response.body.data).toBeTruthy();
        });
        it("should return a list of completed orders only", async () => {
            const response = await request
                .get("/orders?status=completed")
                .set("Authorization", "Bearer " + token);
            expect(response.status).toBe(200);

            //shouldn't include the active order
            expect(response.body.data).not.toContain(
                jasmine.objectContaining({ status: "active" })
            );
        });
        it("should return the current active order", async () => {
            const response = await request
                .get("/orders?status=active")
                .set("Authorization", "Bearer " + token);
            expect(response.status).toBe(200);
            //shouldn't include the completed orders
            expect(response.body.data).not.toContain(
                jasmine.objectContaining({ status: "completed" })
            );
        });
    });
}
