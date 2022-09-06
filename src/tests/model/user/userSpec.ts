import UserStore from "../../../model/user";

//import dummy data
import { dummyUser } from "./dummydata";

describe("Test User Model", () => {
    const store = new UserStore();

    it("Test create method", async () => {
        const data = await store.create(dummyUser);
        expect(data).toEqual(
            jasmine.objectContaining({ first_name: dummyUser.firstName })
        );
    });
});
