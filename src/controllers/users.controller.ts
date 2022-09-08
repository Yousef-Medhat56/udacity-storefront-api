import { Request, Response } from "express";
import UserStore, { User } from "../model/user";
import PasswordHandler from "../handlers/password.handler";
import JwtHandler from "../handlers/jwt.handler";

const store = new UserStore(); //user model
const password = new PasswordHandler(); //password handler
const jwt = new JwtHandler(); //JWT handler

class UsersController {
    //create new user
    async create(req: Request, res: Response) {
        try {
            const user: User = req.body;

            //hash the password
            const hashedPassword = password.hash(user.password);
            user.password = hashedPassword;

            //add the new user to the users table
            const data = await store.create(user);

            //sign the user token
            const token = jwt.sign({ id: data.id });
            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    //get all the users
    async index(_req: Request, res: Response) {
        try {
            const data = await store.index();
            res.json({ data });
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    //get a specific user
    async show(req: Request, res: Response) {
        try {
            const { id } = req.params; //user id

            //get the user from the users table
            const data = await store.show(parseInt(id));

            //if the user exists, send the data to the client
            if (data) res.json({ data });
            //else, send 404 error
            else res.status(404).json({ error: "User doesn't exist" });
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export default UsersController;
