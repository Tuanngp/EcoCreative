

export type LoginRequestParams = {
    username: string;
    password: string;
};

export type User = {
    username: string;
    email: string;
    name: string;
    phone: string;
};

export type LoginResponse = {
    token: string;
    user: User;
};

