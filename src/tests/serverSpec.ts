import supertest from "supertest"
import app from "../server"

//create request object
const request = supertest(app)

describe("Test endpoints",()=>{
it("Test main endpoint",async()=>{
    const response= await request.get("/")
    expect(response.status).toBe(200)
})
})