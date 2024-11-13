import { User } from "../login/type";

export type RegisterRequestParams = {
    username: string;
    name: string;
    email: string;
    password: string;
};

export type RegisterResponse = {
    token: string;
    user: User;
}