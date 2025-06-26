export interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    color?: string;
    size?: string;
    slug: string;
}

export interface Cart {
    items: CartItem[];
    totalItems: number;
    subtotal: number;
    shipping: number;
    total: number;
}
