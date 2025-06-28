"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import { saveWishlistToDb, getWishlistFromDb } from "../utils/wishlistDb";
import { useAuth } from "./AuthContext";

interface WishlistContextType {
    items: string[];
    addItem: (productId: string) => void;
    removeItem: (productId: string) => void;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [ids, setIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const hasMergedLocal = useRef(false);

    // Load wishlist IDs from Firestore or localStorage on mount or user change
    useEffect(() => {
        async function loadWishlist() {
            setLoading(true);
            if (user) {
                const dbIds = await getWishlistFromDb(user.uid); // now returns string[]
                // Merge localStorage wishlist on first login
                if (!hasMergedLocal.current) {
                    const local = localStorage.getItem("wishlist");
                    if (local) {
                        const localIds: string[] = JSON.parse(local);
                        // Merge only new items
                        const merged: string[] = Array.from(new Set([...(dbIds || []), ...localIds]));
                        setIds(merged);
                        await saveWishlistToDb(user.uid, merged);
                        localStorage.removeItem("wishlist");
                        hasMergedLocal.current = true;
                        setLoading(false);
                        return;
                    }
                }
                setIds(dbIds || []);
            } else {
                const saved = localStorage.getItem("wishlist");
                setIds(saved ? JSON.parse(saved) : []);
            }
            setLoading(false);
        }
        loadWishlist();
        // eslint-disable-next-line
    }, [user]);

    // Save wishlist IDs to Firestore or localStorage whenever it changes (but not during initial load)
    useEffect(() => {
        if (loading) return;
        if (user) {
            saveWishlistToDb(user.uid, ids);
        } else {
            localStorage.setItem("wishlist", JSON.stringify(ids));
        }
    }, [ids, user, loading]);

    const addItem = (productId: string) => {
        setIds((prev) => (prev.includes(productId) ? prev : [...prev, productId]));
    };

    const removeItem = (productId: string) => {
        setIds((prev) => prev.filter((id) => id !== productId));
    };

    const clearWishlist = () => setIds([]);

    if (loading) {
        return <div className="w-full text-center py-8 text-gray-500">Loading wishlist...</div>;
    }

    return (
        <WishlistContext.Provider value={{ items: ids, addItem, removeItem, clearWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
    return context;
}
