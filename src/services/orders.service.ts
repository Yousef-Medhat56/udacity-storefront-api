import { Pool } from "pg";
import client from "../database";
import OrderStore from "../model/order";

class OrderServices extends OrderStore {
    //get the order id using the user id
    async getOrderIdByUserId(user_id: number): Promise<number> {
        const connection = await (client as Pool).connect();
        const sql = "SELECT id FROM orders WHERE user_id =$1";
        const result = await connection.query(sql, [user_id]);
        connection.release();
        return result.rows[0].id;
    }

    //return array of product ids in the order
    async getProductIdsBtOrderId(order_id: number) {
        const connection = await (client as Pool).connect();
        const sql = "SELECT product_id FROM products_orders WHERE order_id=$1";
        const result = await connection.query(sql, [order_id]);
        connection.release();

        //product ids array
        const productIds: number[] = [];

        //itterate through each row in the results
        for (const row of result.rows) {
            //push the product id to the product ids array
            productIds.push(row.product_id);
        }

        return productIds;
    }
}

export default OrderServices;
