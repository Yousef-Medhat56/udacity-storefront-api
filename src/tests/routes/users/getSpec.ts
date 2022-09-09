import supertest from "supertest";
import app from "../../../server";

//create request object
const request = supertest(app);

export default function testGetUserRoute() {
    describe("Test: GET /users", () => {
        const validToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYyNzA4MzI5fQ.lpWXFlUFDKvNJw7FLVj2OV665Uqu-wSQuhLqpZUztNY";

        const inValidToken = "this is an invalid token";

        it("send request with the a valid token in the Authorization header", async () => {
            const response = await request
                .get("/users")
                .set("Authorization", "Bearer " + validToken);
            expect(response.status).toBe(200);
            expect(response.body.data).toBeTruthy();
        });

        it("send request with an invalid token in the Authorization header", async () => {
            const response = await request
                .get("/users")
                .set("Authorization", "Bearer " + inValidToken);
            expect(response.status).toBe(401);
        });

        it("send request without the Authorization header", async () => {
            const response = await request.get("/users");
            expect(response.status).toBe(401);
        });
    });
}
