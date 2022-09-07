import PasswordHandler from "../../handlers/password.handler";

const password = new PasswordHandler();

describe("Test Password handler", () => {
    const truePassword = "true password";
    const wrongPassword = "wrong password";

    it("comparing the hashed password with the true password", () => {
        //hash the true password
        const hashedPassword = password.hash(truePassword);

        //compare the hashed password with true password
        const isTruePass = password.compare(truePassword, hashedPassword);
        expect(isTruePass).toBeTrue();
    });

    it("comparing the hashed password with a wrong password", () => {
        //hash the true password
        const hashedPassword = password.hash(truePassword);

        //compare the hashed password with wrong password
        const isTruePass = password.compare(wrongPassword, hashedPassword);
        expect(isTruePass).toBeFalse();
    });
});
