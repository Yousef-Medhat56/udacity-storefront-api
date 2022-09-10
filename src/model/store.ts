import { Pool } from "pg";
import client from "../database";

class Store {
    //write sql query
    async query(sql: string, values: unknown[]) {
        const connection = await (client as Pool).connect();
        const result = await connection.query(sql, values);
        connection.release();
        return result.rows;
    }
}

export default Store;
