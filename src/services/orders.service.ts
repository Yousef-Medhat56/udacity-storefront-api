import OrderStore from "../model/order";

class OrderServices extends OrderStore {
    //get the order id using the user id
    async getOrderIdByUserId(user_id: number): Promise<number> {
        const sql = "SELECT id FROM orders WHERE user_id =$1 ORDER BY id DESC";
        const result = await this.query(sql, [user_id]);
        return result[0].id;
    }

    //return array of product ids in the order
    async getProductIdsBtOrderId(order_id: number) {
        const sql = "SELECT product_id FROM products_orders WHERE order_id=$1";
        const result = await this.query(sql, [order_id]);

        //product ids array
        const productIds: number[] = [];

        //itterate through each row in the result
        for (const row of result) {
            //push the product id to the product ids array
            productIds.push(row.product_id);
        }

        return productIds;
    }

    //return array of products in the order
    async getProductsInOrder(order_id: number) {
        const sql = `SELECT product_id, name AS product_name,category as product_category,price AS product_price,quantity FROM products_orders 
            JOIN products ON products.id=products_orders.product_id AND products_orders.order_id = $1`;

        const result = await this.query(sql, [order_id]);
        return result;
    }

    //change the order status to "completed"
    async completeOrder(user_id: number) {
        //order id
        const order_id = await this.getOrderIdByUserId(user_id);
        const completedOrder = await this.update(order_id);
        return { data: completedOrder };
    }

    //get orders depending on the order status
    async getOrdersByStatus(user_id: number, order_status: string | undefined) {
        let sql: string | undefined; //sql query

        switch (order_status) {
            //get the current active order
            case "active":
                sql =
                    "SELECT id as order_id,status from orders WHERE user_id=$1 and status = 'active'";
                break;

            //get the completed orders
            case "completed":
                sql =
                    "SELECT id as order_id,status from orders WHERE user_id=$1 and status = 'completed'";
                break;

            //get all the orders
            default:
                sql =
                    "SELECT id as order_id,status from orders WHERE user_id=$1";
                break;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ordersArr: any[] = await this.query(sql as string, [user_id]); //orders array
        const data: unknown[] = [];
        //itterate through each order
        for (const order of ordersArr) {
            //order id and order status
            const { order_id, status } = order;

            //get the products in each order
            const productsInOrder = await this.getProductsInOrder(order_id);
            data.push({ order_id, status, products: productsInOrder });
        }

        return data;
    }
}

export default OrderServices;
