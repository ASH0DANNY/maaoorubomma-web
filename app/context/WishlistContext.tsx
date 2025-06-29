"use client";

import { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";
import { getWishlistFromDb, addToWishlist, removeFromWishlist } from "../utils/wishlistDb";
import { useAuth } from "./AuthContext";
import type { Product } from "../types/product";

interface WishlistContextType {
    items: Product[];
    addItem: (product: Product) => Promise<void>;
    removeItem: (productId: string) => Promise<void>;
    clearWishlist: () => Promise<void>;
    loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const hasMergedLocal = useRef(false);

    // Load wishlist products from Firestore or localStorage on mount or user change
    useEffect(() => {
        async function loadWishlist() {
            setLoading(true);
            try {
                if (user) {
                    const dbItems = await getWishlistFromDb(user.uid);
                    // Merge localStorage wishlist on first login
                    if (!hasMergedLocal.current) {
                        const local = localStorage.getItem("wishlist");
                        if (local) {
                            const localItems: Product[] = JSON.parse(local);
                            // Merge only new items
                            const mergedMap = new Map<string, Product>([
                                ...dbItems.map((p: Product) => [p.id, p] as [string, Product]),
                                ...localItems.map((p: Product) => [p.id, p] as [string, Product]),
                            ]);
                            const merged: Product[] = Array.from(mergedMap.values());
                            setItems(merged);
                            // Save merged to Firestore
                            for (const prod of merged) {
                                await addToWishlist(user.uid, prod);
                            }
                            localStorage.removeItem("wishlist");
                            hasMergedLocal.current = true;
                            return;
                        }
                    }
                    setItems(dbItems || []);
                } else {
                    const saved = localStorage.getItem("wishlist");
                    setItems(saved ? JSON.parse(saved) : []);
                }
            } catch (error) {
                console.error("Error loading wishlist:", error);
            } finally {
                setLoading(false);
            }
        }
        loadWishlist();
        // eslint-disable-next-line
    }, [user]);

    const addItem = useCallback(async (product: Product) => {
        if (user) {
            await addToWishlist(user.uid, product);
            const updated = await getWishlistFromDb(user.uid);
            setItems(updated);
        } else {
            setItems((prev) => (prev.find((p) => p.id === product.id) ? prev : [...prev, product]));
            localStorage.setItem("wishlist", JSON.stringify([...items, product]));
        }
    }, [user, items]);

    const removeItem = useCallback(async (productId: string) => {
        if (user) {
            await removeFromWishlist(user.uid, productId);
            const updated = await getWishlistFromDb(user.uid);
            setItems(updated);
        } else {
            setItems((prev) => prev.filter((p) => p.id !== productId));
            localStorage.setItem("wishlist", JSON.stringify(items.filter(p => p.id !== productId)));
        }
    }, [user, items]);

    const clearWishlist = useCallback(async () => {
        if (user) {
            // Use new clearWishlistDb
            const { clearWishlistDb } = await import("../utils/wishlistDb");
            await clearWishlistDb(user.uid);
        } else {
            localStorage.setItem("wishlist", JSON.stringify([]));
        }
        setItems([]);
    }, [user]);

    if (loading) {
        return <div className="w-full text-center py-8 text-gray-500">Loading wishlist...</div>;
    }

    return (
        <WishlistContext.Provider value={{ items, addItem, removeItem, clearWishlist, loading }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
    return context;
}
