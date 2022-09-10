import OrderStore, { Order, ProductOrder } from "../../model/order";

const dummyOrder: Order = {
    user_id: 1,
    status: "active",
};

const dummyProductOrder: ProductOrder = {
    product_id: 1,
    order_id: 1,
    quantity: 3,
};

export default function testOrderModel() {
    describe("Test Order model", () => {
        const store = new OrderStore();

        it("Test (create) method", async () => {
            const data = await store.create(dummyOrder.user_id);
            expect(data).toEqual(jasmine.objectContaining(dummyOrder));
        });

        it("Test (createProductOrder) method", async () => {
            const data = await store.createProductOrder(dummyProductOrder);
            expect(data).toEqual(jasmine.objectContaining(dummyProductOrder));
        });

        it("Test (update) method", async () => {
            const data = await store.update(1);
            expect(data).toEqual(
                jasmine.objectContaining({ status: "completed" })
            );
        });
    });
}
