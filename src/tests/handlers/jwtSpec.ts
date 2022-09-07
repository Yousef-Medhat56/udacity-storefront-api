import JwtHandler from "../../handlers/jwt.handler";

export default function testJwtHandler() {
    describe("Test Jwt handler", () => {
        const jwt = new JwtHandler();
        it("test (sign) and (decode) methods", () => {
            //sign new token
            const token = jwt.sign({ user_id: 1 });
            //decode the token
            const decoded = jwt.decode(token);
            expect(decoded).toEqual(jasmine.objectContaining({ user_id: 1 }));
        });
    });
}
