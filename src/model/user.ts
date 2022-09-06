import { Pool } from "pg";
import client from "../database";

//create type User
export type User = {
    id?: number;
    firstName: string;
    lastName: string;
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
                newUser.firstName,
                newUser.lastName,
                newUser.password,
            ]);

            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not create user. Error: ${error}`);
        }
    }
}
