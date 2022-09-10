import Store from "./store";

//create type User
export type User = {
    id?: number;
    first_name: string;
    last_name: string;
    password: string;
};

class UserStore extends Store {
    //create new user
    async create(newUser: User): Promise<User> {
        try {
            const sql =
                "INSERT INTO users(first_name,last_name,password) VALUES($1,$2,$3) RETURNING id,first_name,last_name";
            const result = await this.query(sql, [
                newUser.first_name,
                newUser.last_name,
                newUser.password,
            ]);

            return result[0];
        } catch (error) {
            throw new Error(`Could not create user. Error: ${error}`);
        }
    }

    //get users
    async index(): Promise<User[]> {
        try {
            const sql = "SELECT id,first_name,last_name FROM users";
            const result = await this.query(sql);
            return result;
        } catch (error) {
            throw new Error(`Could not get users. Error: ${error}`);
        }
    }

    //show specific user
    async show(id: number): Promise<User> {
        try {
            const sql = "SELECT id,first_name,last_name FROM users WHERE id=$1";
            const result = await this.query(sql, [id]);
            return result[0];
        } catch (error) {
            throw new Error(`Could not get user. Error: ${error}`);
        }
    }
}

export default UserStore;
