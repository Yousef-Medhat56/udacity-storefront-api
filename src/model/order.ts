import { Pool } from "pg";
import client from "../database";
import Store from "./store";

//create type Order
export type Order = {
    id?: number;
    user_id: number;
    status: "active" | "completed";
};

/* create type ProductOrder
 represents the record inserted in the join table between Products and Orders*/
export type ProductOrder = {
    order_id: number;
    product_id: number;
    quantity: number;
};

class OrderStore extends Store{
    //create new order
    async create(user_id:number): Promise<Order> {
        try {
            const connection = await (client as Pool).connect();
            const sql =
                "INSERT INTO orders(user_id,status) VALUES($1,'active') RETURNING *";
            const result = await connection.query(sql, [user_id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not create order. Error: ${error}`);
        }
    }

    //update order
    async update(order_id: number): Promise<Order> {
        try {
            const connection = await (client as Pool).connect();
            const sql =
                "UPDATE orders SET status = 'completed' WHERE id = $1 RETURNING *";
            const result = await connection.query(sql, [order_id]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not update order. Error: ${error}`);
        }
    }

    // create new record in the join table between products and orders
    async createProductOrder(
        newProductOrder: ProductOrder
    ): Promise<ProductOrder> {
        try {
            const connection = await (client as Pool).connect();
            const sql =
                "INSERT INTO products_orders(order_id,product_id,quantity) VALUES($1,$2,$3) RETURNING *";

            // destruct newProductOrder object
            const { order_id, product_id, quantity } = newProductOrder;
            const result = await connection.query(sql, [
                order_id,
                product_id,
                quantity,
            ]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not create ProductOrder. Error: ${error}`);
        }
    }

    // update a record in the join table between products and orders
    async updateProductOrder(
        newProductOrder: ProductOrder
    ): Promise<ProductOrder> {
        try {
            const connection = await (client as Pool).connect();
            const sql =
                "UPDATE products_orders SET quantity = $3 WHERE order_id=$1 AND product_id=$2 RETURNING *";

            // destruct newProductOrder object
            const { order_id, product_id, quantity } = newProductOrder;
            const result = await connection.query(sql, [
                order_id,
                product_id,
                quantity,
            ]);
            //if there are results, return it
            if (result.rows.length) {
                return result.rows[0];
            }
            throw new Error();
        } catch (error) {
            throw new Error(`Could not update ProductOrder. Error: ${error}`);
        }
    }
}


export default OrderStore;