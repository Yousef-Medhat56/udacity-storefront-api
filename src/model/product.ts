import { Pool } from "pg";
import client from "../database";

//create type Product
export type Product = {
    id?: number;
    name:string,
    price:number,
    category:string
};

export default class ProductStore{
    async create(newProduct:Product):Promise<Product>{
        try {
            const connection = await (client as Pool).connect();
            const sql =
                "INSERT INTO products(name,price,category) VALUES($1,$2,$3) RETURNING *";
            const result = await connection.query(sql, [
                newProduct.name,
                newProduct.price,
                newProduct.category,
            ]);

            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not create product. Error: ${error}`);
        }
    }
}