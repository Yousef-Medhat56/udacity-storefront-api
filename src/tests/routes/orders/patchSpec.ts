import supertest from "supertest";
import app from "../../../server";

//create request object
const request = supertest(app);

export default function testPatchOrdersRoute(token: string) {
    describe("Test: PATCH /orders/complete", () => {
        it("should change the order status to completed", async () => {
            const response = await request
                .patch("/orders/complete")
                .set("Authorization", "Bearer " + token);
            expect(response.status).toBe(200);
            expect(response.body.data).toEqual(
                jasmine.objectContaining({ status: "completed" })
            );
        });
    });
}
