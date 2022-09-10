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

    async getProductsInOrder(order_id: number) {
        const connection = await (client as Pool).connect();
        const sql = `SELECT product_id, name AS product_name,price AS product_price,quantity FROM products_orders 
            JOIN products ON products.id=products_orders.product_id AND products_orders.order_id = $1`;

        const result = await connection.query(sql, [order_id]);
        connection.release();
        return result.rows;
    }

    async getProductIdsBtOrderId(order_id: number) {
        const connection = await (client as Pool).connect();
        const sql = "SELECT product_id FROM products_orders WHERE order_id=$1";
        const result = await connection.query(sql, [order_id]);
        connection.release();
        const productIds: number[] = [];
        for (const row of result.rows) {
            productIds.push(row.product_id);
        }

        return productIds;
    }
}

export default OrderServices;
