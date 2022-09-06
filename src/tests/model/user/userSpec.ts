import UserStore from "../../../model/user";

//import dummy data
import { dummyUser } from "./dummydata";

describe("Test User Model", () => {
    const store = new UserStore();

    it("Test (create) method", async () => {
        const data = await store.create(dummyUser);
        expect(data).toEqual(jasmine.objectContaining(dummyUser));
    });

    it("Test (index) method", async () => {
        const data = await store.index();
        expect(data).toContain({ id: 1, ...dummyUser });
    });
});
