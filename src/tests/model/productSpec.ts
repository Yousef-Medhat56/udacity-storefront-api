import ProductStore, { Product } from "../../model/product";

//create dummy user
const dummyProduct: Product = {
    name: "Fishing Rod",
    price: 100,
    category: "fishing",
};
export default function testProductModel() {
    describe("Test Product model", () => {
        const store = new ProductStore();

        it("Test (create) method", async () => {
            const data = await store.create(dummyProduct);
            expect(data).toEqual(jasmine.objectContaining(dummyProduct));
        });

        it("Test (index) method", async () => {
            const data = await store.index();
            expect(data).toContain({ id: 1, ...dummyProduct });
        });

        it("Test (show) method", async () => {
            const data = await store.show(1);
            expect(data).toEqual(jasmine.objectContaining({ id: 1 }));
        });
    });
}
