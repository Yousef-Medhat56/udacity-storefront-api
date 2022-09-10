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

    // get top 5 most popular products
    async getTop5Products() {
        
        const sql = `SELECT product_id,name,category,price,SUM(quantity)::INTEGER AS sold_quantity from (SELECT * FROM products_orders 
            JOIN products ON products_orders.product_id=products.id) AS data 
            GROUP BY product_id,name,price,category ORDER BY sold_quantity DESC LIMIT 5`;

        const topProducts = await this.query(sql);
        return topProducts;
    }
}

export default ProductServices;
