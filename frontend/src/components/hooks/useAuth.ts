import { useState, useEffect } from "react";
import { LOGIN } from "../constants/api";
import method from "../constants/method";
import { setAuthToken, callApi } from "./useApi";


// Khai báo interface cho user
interface User {
    username: string;
    fullName: string;
    email: string;
    phone: string;
}

// Interface cho hook trả về
interface UseAuthReturn {
    user: User | null;
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

// Khai báo hằng số cho key của localStorage
const USER_KEY = "user";
const TOKEN_KEY = "token";

const useAuth = (): UseAuthReturn => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    // Khi component load, lấy thông tin user và token từ localStorage
    useEffect(() => {
        const savedUser = localStorage.getItem(USER_KEY);
        const savedToken = localStorage.getItem(TOKEN_KEY);
        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser));
            setToken(savedToken);
            setAuthToken(savedToken);
        }
    }, []);

    // Hàm login: gọi API để đăng nhập và lưu user, token vào localStorage
    const login = async (username: string, password: string) => {
        try {
            const response = await callApi({
                data: {RegiterRequestParams: {username, password}},
                path: LOGIN,
                method: method.POST,
            });

            const { token, user } = response.data;

            // Lưu token và user vào localStorage
            localStorage.setItem(TOKEN_KEY, token);
            localStorage.setItem(USER_KEY, JSON.stringify(user));

            // Cập nhật state
            setToken(token);
            setUser(user);
            setAuthToken(token);
        } catch (error) {
            console.error("Login failed:", error);
            throw new Error("Login failed");
        }
    };

    // Hàm logout: xóa token và user khỏi localStorage và state
    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
        setAuthToken(null);
    };

    // Xác định người dùng đã đăng nhập hay chưa
    const isAuthenticated = !!token;

    return {
        user,
        token,
        login,
        logout,
        isAuthenticated,
    };
};

export default useAuth;