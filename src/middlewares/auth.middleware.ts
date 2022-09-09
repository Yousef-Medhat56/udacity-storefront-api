//check if the user is authorized to go to the next endpoint or not

import { Request, Response, NextFunction } from "express";
import JwtHandler from "../handlers/jwt.handler";

//JWT handler
const jwt = new JwtHandler();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        //the authorization header
        const { authorization } = req.headers;
        //jwt token
        const token = (authorization as string).split(" ")[1];
        // decode the token
        const userDecoded = jwt.decode(token) as { id: number };

        //if the user is authorised
        if (userDecoded.id) {
            res.locals.user_id = userDecoded.id;
            next();
        }
        //if the user is not authorised
        else throw new Error();
    } catch (error) {
        res.status(401).json({ error: "Unauthorized" });
    }
};

export default verifyToken;
