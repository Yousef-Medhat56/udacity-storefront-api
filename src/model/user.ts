import { Pool } from "pg";
import client from "../database";

//create type User
export type User = {
    id?: number;
    first_name: string;
    last_name: string;
    password: string;
};

export default class UserStore {
    //create new user
    async create(newUser: User): Promise<User> {
        try {
            const connection = await (client as Pool).connect();
            const sql =
                "INSERT INTO users(first_name,last_name,password) VALUES($1,$2,$3) RETURNING *";
            const result = await connection.query(sql, [
                newUser.first_name,
                newUser.last_name,
                newUser.password,
            ]);

            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not create user. Error: ${error}`);
        }
    }

    //get users
    async index(): Promise<User[]> {
        try {
            const connection = await (client as Pool).connect();
            const sql = "SELECT id,first_name,last_name FROM users";
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Could not get users. Error: ${error}`);
        }
    }

    //show specific user
    async show(id: number): Promise<User> {
        try {
            const connection = await (client as Pool).connect();
            const sql = "SELECT id,first_name,last_name FROM users WHERE id=$1";
            const result = await connection.query(sql, [id]);
            connection.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not get user. Error: ${error}`);
        }
    }
}
