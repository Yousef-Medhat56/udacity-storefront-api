import supertest from "supertest";
import app from "../../../server";

//create request object
const request = supertest(app);

export default function testPostUserRoute() {
    describe("Test: POST /users", () => {
        it("send RIGHT body request", async () => {
            const response = await request.post("/users").send({
                first_name: "Rick",
                last_name: "Sanchez",
                password: "WUBBA LUBBA DUB-DUB!",
            });
            expect(response.status).toBe(200);
            expect(response.body.token).toBeTruthy();
        });
        it("send BAD body request", async () => {
            const response = await request.post("/users").send({
                last_name: "Sanchez",
                password: "WUBBA LUBBA DUB-DUB!",
            });
            expect(response.status).toBe(400);
            expect(response.body.token).toBeFalsy();
        });
    });
}
