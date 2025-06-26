import type { CartItem } from "./cart";

export interface WishlistItem {
    productId: string;
    name: string;
    image: string;
    slug: string;
    price: number;
    addedAt: string;
}
