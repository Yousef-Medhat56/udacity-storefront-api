import { Request, Response } from "express";
import ProductStore, { Product } from "../model/product";

const store = new ProductStore(); //product model

class ProductsController {
    //create new product
    async create(req: Request, res: Response) {
        try {
            const product: Product = req.body;
            //add the new product to the products table
            const data = await store.create(product);
            res.json({ data });
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export default ProductsController;
