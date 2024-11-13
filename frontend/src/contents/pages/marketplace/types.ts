export type Seller = {
    id: string;
    name: string;
    rating: number;
    avatar: string;
};

export type Product = {
    id: string;
    name: string;
    price: number;
    status: 'new' | 'used' | 'refurbished' | 'active' | 'pending' | 'sold';
    description: string;
    images: string[];
    seller: Seller;
    category: string;
    location: string;
    views: number;
    likes: number;
    createdAt: string;
};

export type FilterState = {
    category: string;
    priceRange: [number, number];
    status: string;
    location: string;
    sortBy: 'price-asc' | 'price-desc' | 'date' | 'popularity';
};

export type CartItem = {
    product: Product;
    quantity: number;
};