import { User } from "../../../model/user";

//singlr user
const dummyUser: User = {
    firstName: "Gon",
    lastName: "Freecs",
    password: "gon passowrd",
};

//users array
const dummyUserArr: User[] = [
    { firstName: "Gon", lastName: "Freecs", password: "gon passowrd" },
    { firstName: "Killua", lastName: "Zoldick", password: "Killua passowrd" },
    { firstName: "Kurapika", lastName: "Kurta", password: "Kurapika passowrd" },
];

export { dummyUser, dummyUserArr };
