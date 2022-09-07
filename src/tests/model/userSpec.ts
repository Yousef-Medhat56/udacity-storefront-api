import UserStore, { User } from "../../model/user";

//create dummy user
const dummyUser: User = {
    first_name: "Gon",
    last_name: "Freecs",
    password: "gon passowrd",
};

export default function testUserModel() {
    describe("Test User model", () => {
        const store = new UserStore();

        it("Test (create) method", async () => {
            const data = await store.create(dummyUser);
            expect(data).toEqual(jasmine.objectContaining(dummyUser));
        });

        it("Test (index) method", async () => {
            const data = await store.index();
            expect(data).toContain({ id: 1, ...dummyUser });
        });

        it("Test (show) method", async () => {
            const data = await store.show(1);
            expect(data).toEqual(jasmine.objectContaining({ id: 1 }));
        });
    });
}
