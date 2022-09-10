import Store from "./store";

//create type Product
export type Product = {
    id?: number;
    name: string;
    price: number;
    category: string;
};

class ProductStore extends Store {
    //create new product
    async create(newProduct: Product): Promise<Product> {
        try {
            const sql =
                "INSERT INTO products(name,price,category) VALUES($1,$2,$3) RETURNING *";
            const result = await this.query(sql, [
                newProduct.name,
                newProduct.price,
                newProduct.category,
            ]);
            return result[0];
        } catch (error) {
            throw new Error(`Could not create product. Error: ${error}`);
        }
    }

    //get products
    async index(): Promise<Product[]> {
        try {
            const sql = "SELECT * FROM products";
            const result = await this.query(sql);
            return result;
        } catch (error) {
            throw new Error(`Could not get products. Error: ${error}`);
        }
    }

    //show specific user
    async show(id: number): Promise<Product> {
        try {
            const sql = "SELECT * FROM products WHERE id=$1";
            const result = await this.query(sql, [id]);
            return result[0];
        } catch (error) {
            throw new Error(`Could not get product. Error: ${error}`);
        }
    }
}

export default ProductStore;
