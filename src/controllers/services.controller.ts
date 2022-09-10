import { Request, Response } from "express";

//orders services
import OrderServices from "../services/orders.service";
import ProductServices from "../services/products.service";

const orderServices = new OrderServices();
const productServices = new ProductServices();

class ServicesController {
    async controlCompleteOrder(_req: Request, res: Response) {
        //user id
        const { user_id } = res.locals;
        //order id
        const order_id = await orderServices.getOrderIdByUserId(user_id);

        //get products in order
        const productsInOrder = await orderServices.getProductsInOrder(
            order_id as number
        );

        //if the order contains products
        if (productsInOrder.length) {
            //complete the order (change order status to "completed")
            await orderServices.completeOrder(user_id);

            //create new active order
            await orderServices.create(user_id);
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
    }

    //get top 5 most popular products
    async getTopProducts(_req: Request, res: Response) {
        const data = await productServices.getTop5Products();
        res.json({ data });
    }
}

export default ServicesController;
