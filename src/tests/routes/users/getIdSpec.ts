import supertest from "supertest";
import app from "../../../server";

//create request object
const request = supertest(app);

export default function testGetIdUserRoute(token: string) {
    describe("Test: GET /users/:id", () => {
        it("enter existed user id", async () => {
            const response = await request
                .get("/users/1")
                .set("Authorization", "Bearer " + token);
            expect(response.status).toBe(200);
            expect(response.body.data).toBeTruthy();
        });
        it("enter unexisted user id", async () => {
            const response = await request
                .get("/users/100")
                .set("Authorization", "Bearer " + token);
            expect(response.status).toBe(404);
        });
        it("enter invalid user id", async () => {
            const response = await request
                .get("/users/abc")
                .set("Authorization", "Bearer " + token);
            expect(response.status).toBe(400);
        });
    });
}
