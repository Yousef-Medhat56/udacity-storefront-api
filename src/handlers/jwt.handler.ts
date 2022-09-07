import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default class JwtHandler {
    private secret: string | undefined = process.env.TOKEN_SECRET;

    //sign new token
    sign(id: number): string {
        const token = jwt.sign({ id }, this.secret as string);
        return token;
    }
}
