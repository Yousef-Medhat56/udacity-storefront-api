import bcrypt from "bcrypt";

export default class PasswordHandler {
    private pepper: string | undefined = process.env.BCRYPT_PASSWORD;
    private salt: number | undefined = parseInt(
        process.env.SALT_ROUNDS as string
    );

    //hash the password
    hash(password: string): string {
        const hash = bcrypt.hashSync(
            password + this.pepper,
            this.salt as number
        );
        return hash;
    }
}
