import jwt from "jsonwebtoken";

class JwtHandler {
    private secret: string | undefined = process.env.TOKEN_SECRET;
    
    //sign new token
    sign(id: number):string {
        const token = jwt.sign({ id }, this.secret as string);
        return token
    }
}
