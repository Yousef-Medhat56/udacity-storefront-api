import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const { DEV_DB, TEST_DB, DB_USER, DB_PASSWORD, ENV } = process.env;

let client: Pool | undefined;

if (ENV === "test") {
    client = new Pool({
        host: "127.0.0.1",
        database: TEST_DB,
        user: DB_USER,
        password: DB_PASSWORD,
    });
}

if (ENV === "dev") {
    client = new Pool({
        host: "127.0.0.1",
        database: DEV_DB,
        user: DB_USER,
        password: DB_PASSWORD,
    });
}

export default client;
