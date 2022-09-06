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
});
