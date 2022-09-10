import { Request, Response } from "express";
import ProductStore, { Product } from "../model/product";
import ProductServices from "../services/products.service";

const store = new ProductStore(); //product model
const service = new ProductServices(); //products services

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

    //get all the products
    async index(req: Request, res: Response) {
        try {
            //product category
            const category = req.query.category as string;
            const data = await service.getProducts(category);
            const { error } = data as { error: string };
            //if the category doesn't exist
            if (error)
                res.status(404).json({
                    error,
                });
            else res.json({ data });
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    //get a specific product
    async show(req: Request, res: Response) {
        try {
            const { id } = req.params; //product id

            //get the product from the product table
            const data = await store.show(parseInt(id));

            //if the product exists, send the data to the client
            if (data) res.json({ data });
            //else, send 404 error
            else res.status(404).json({ error: "Product doesn't exist" });
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export default ProductsController;
