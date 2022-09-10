import { Request, Response } from "express";
import OrderStore from "../model/order";
import OrderServices from "../services/orders.service";

const store = new OrderStore(); //order model
const services = new OrderServices(); //order service

class OrdersController {
    //add a product to the current order
    async addProductToOrder(req: Request, res: Response) {
        try {
            //user id
            const user_id: number = res.locals.user_id;
            
            //get the order id
            const order_id = await services.getOrderIdByUserId(user_id);
          
            //product id and quantity
            const { product_id, quantity } = req.body;

            //the record insertend in the join table between products and orders
            const productOrderRecord = { order_id, product_id, quantity };

            //product ids in the current order
            const productIds = await services.getProductIdsBtOrderId(order_id);
            
            //check if the user has ordered this product before or not
            const isOrderedProduct = productIds.includes(product_id);
            
            //if the user has already ordered the product
            if (isOrderedProduct) {
                await store.updateProductOrder(productOrderRecord);
            }
            //if the user order the product for the first time
            else {
                await store.createProductOrder(productOrderRecord);
            }

            //get all the products in the order
            const productsInOrder = await services.getProductsInOrder(order_id);
            res.json({ data: { order_id, products: productsInOrder } });
        } catch (error) {
            res.status(400).json({ error: "Product doesn't exist" });
        }
    }
}

export default OrdersController;
