import express, { Request, Response } from "express";
import bodyParser from "body-parser";

//import routes
import usersRoute from "./routes/users.route";
import productsRoute from "./routes/products.route"

const app: express.Application = express();
const address = "0.0.0.0:3000";

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
    res.send("Hello World!");
});

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});

//Routes
app.use("/users", usersRoute);
app.use("/products",productsRoute)

export default app;
