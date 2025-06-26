"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { WishlistItem } from "../types/wishlist";

interface WishlistContextType {
    items: WishlistItem[];
    addItem: (item: WishlistItem) => void;
    removeItem: (productId: string) => void;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<WishlistItem[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("wishlist");
        if (saved) setItems(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(items));
    }, [items]);

    const addItem = (item: WishlistItem) => {
        setItems((prev) => {
            if (prev.some((i) => i.productId === item.productId)) return prev;
            return [...prev, item];
        });
    };

    const removeItem = (productId: string) => {
        setItems((prev) => prev.filter((i) => i.productId !== productId));
    };

    const clearWishlist = () => setItems([]);

    return (
        <WishlistContext.Provider value={{ items, addItem, removeItem, clearWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
    return context;
}
