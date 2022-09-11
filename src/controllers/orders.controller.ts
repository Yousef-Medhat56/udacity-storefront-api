import { Request, Response } from "express";

import OrderServices from "../services/orders.service";

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
            const isOrderedProduct = productIds.includes(parseInt(product_id));

            //if the user has already ordered the product
            if (isOrderedProduct) {
                await services.updateProductOrder(productOrderRecord);
            }
            //if the user order the product for the first time
            else {
                await services.createProductOrder(productOrderRecord);
            }

            //get all the products in the order
            const productsInOrder = await services.getProductsInOrder(order_id);
            res.json({ data: { order_id, products: productsInOrder } });
        } catch (error) {
            res.status(400).json({ error: "Product doesn't exist" });
        }
    }

    //get orders
    async getOrders(req: Request, res: Response) {
        try {
            //user id
            const user_id: number = res.locals.user_id;

            //order status
            const status = req.query.status as string;
            const data = await services.getOrdersByStatus(user_id, status);
            res.json({ data });
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async completeOrder(_req: Request, res: Response) {
        try {
            //user id
            const { user_id } = res.locals;
            //order id
            const order_id = await services.getOrderIdByUserId(user_id);

            //get products in order
            const productsInOrder = await services.getProductsInOrder(
                order_id as number
            );

            //if the order contains products
            if (productsInOrder.length) {
                //complete the order (change order status to "completed")
                await services.completeOrder(user_id);

                //create new active order
                await services.create(user_id);
                res.json({
                    data: {
                        order_id,
                        status: "completed",
                        products: productsInOrder,
                    },
                });
            }
            // if the order doesn't contain products
            else {
                res.status(400).json({
                    error: "you haven't ordered any products yet",
                });
            }
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export default OrdersController;
