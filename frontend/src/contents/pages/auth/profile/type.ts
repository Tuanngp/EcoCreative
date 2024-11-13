import { Product } from "../../marketplace/types";

export interface UserProfile {
    id: string;
    name: string;
    avatar: string;
    email: string;
    phone: string;
    location: string;
    joinDate: string;
    verified: boolean;
    rating: number;
    totalReviews: number;
    products: Product[];
    favoriteProducts: Product[];
}