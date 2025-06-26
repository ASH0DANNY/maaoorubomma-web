import type { CartItem } from "../types/cart";

const COOKIE_NAME = "cart";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function getCartFromCookie(): CartItem[] {
    if (typeof document === "undefined") return [];
    const match = document.cookie.match(new RegExp('(^| )' + COOKIE_NAME + '=([^;]+)'));
    if (!match) return [];
    try {
        return JSON.parse(decodeURIComponent(match[2]));
    } catch {
        return [];
    }
}

export function setCartToCookie(items: CartItem[]) {
    if (typeof document === "undefined") return;
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(items))};path=/;max-age=${COOKIE_MAX_AGE}`;
}

export function clearCartCookie() {
    if (typeof document === "undefined") return;
    document.cookie = `${COOKIE_NAME}=;path=/;max-age=0`;
}
