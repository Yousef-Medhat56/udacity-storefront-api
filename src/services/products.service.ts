import ProductStore from "../model/product";

class ProductServices extends ProductStore {
    async getProducts(category: string | undefined) {
        //get products of a specific category
        if (category) {
            try {
                const sql = "SELECT * FROM PRODUCTS WHERE category =$1";
                const data = await this.query(sql, [category]);
                if (data.length) {
                    return data;
                } else throw new Error();
            } catch (error) {
                //if the category doesn't exist
                return { error: "This category doesn't exist" };
            }
        }
        //get all the products
        else {
            const data = await this.index();
            return data;
        }
    }
}

export default ProductServices;
