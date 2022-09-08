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
}

export default UsersController;
