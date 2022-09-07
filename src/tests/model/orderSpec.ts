import OrderStore, { Order } from "../../model/order";

const dummyOrder: Order = {
    user_id: 1,
    status: "active",
};

export default function testOrderModel() {
    describe("Test Order model", () => {
        const store = new OrderStore();

        it("Test (create) method", async () => {
            const data = await store.create(dummyOrder);

            expect(data).toEqual(jasmine.objectContaining(dummyOrder));
        });
    });
}
