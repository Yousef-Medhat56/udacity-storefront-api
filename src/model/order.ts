import { Pool } from "pg";
import client from "../database";

//create type Order
export type Order = {
    id?: number;
    user_id: number;
    status: "active" | "completed";
};

export default class OrderStore {
    //create new order
    async create(newOrder: Order) {
        try {
            const connection = await (client as Pool).connect();
            const sql =
                "INSERT INTO orders(user_id,status) VALUES($1,'active') RETURNING *";
            const result = await connection.query(sql, [newOrder.user_id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not create order. Error: ${error}`);
        }
    }
}
