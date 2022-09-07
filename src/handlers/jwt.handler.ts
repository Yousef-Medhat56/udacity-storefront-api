import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default class JwtHandler {
    private secret: string | undefined = process.env.TOKEN_SECRET;

    //sign new token
    sign(payload: object): string {
        const token = jwt.sign(payload, this.secret as string);
        return token;
    }

    //decode the token
    decode(token: string) {
        const decoded = jwt.verify(token, this.secret as string);
        return decoded;
    }
}
