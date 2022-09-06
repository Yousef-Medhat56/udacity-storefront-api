import ProductStore, { Product } from "../../model/product";

//create dummy user
const dummyProduct: Product = {
    name: "Fishing Rod",
    price: 100,
    category: "fishing",
};

describe("Test Product Model", () => {
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
