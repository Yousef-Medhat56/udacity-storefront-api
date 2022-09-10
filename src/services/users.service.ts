import UserStore, { User } from "../model/user";
import OrderStore from "../model/order";

const orderStore = new OrderStore();

class UserServices extends UserStore {
    //create a new active order after creating each new user
    async createUserWithOrder(newUser: User): Promise<{
        id: number | undefined;
        first_name: string;
        last_name: string;
    }> {
        try {
            //create new user
            const { id, first_name, last_name } = await this.create(newUser);

            //create new active order for the new user
            await orderStore.create({
                user_id: id as number,
                status: "active",
            });
            return { id, first_name, last_name };
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
}

export default UserServices;
