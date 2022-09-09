import UserStore, { User } from "../model/user";
import OrderStore from "../model/order";

const orderStore = new OrderStore();

class UserServices extends UserStore {
    //create a new active order after creating each new user
    async createUserWithOrder(newUser: User): Promise<{
        id: number | undefined;
        first_name: string;
        last_name: string;
        order: { order_id: number | undefined; status: string };
    }> {
        try {
            //create new user
            const { id, first_name, last_name } = await this.create(newUser);

            //create new active order for the new user
            const { id: order_id, status } = await orderStore.create({
                user_id: id as number,
                status: "active",
            });
            return { id, first_name, last_name, order: { order_id, status } };
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
}

export default UserServices;
