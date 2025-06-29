"use client";

import { useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import { ProductCard } from "../components/ProductCard";
import { EmptyWishlist } from "../components/EmptyStateGraphics";

export default function WishlistPage() {
    const { items: products, clearWishlist } = useWishlist();
    const [loading, setLoading] = useState(false); // No async fetch needed now

    return (
        <div className="max-w-7xl mx-auto mt-12 p-4">
            <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
            {loading ? (
                <div className="text-gray-500">Loading...</div>
            ) : products.length === 0 ? (
                <EmptyWishlist size="xl" />
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} isGridView={true} linkToDetails />
                        ))}
                    </div>
                    <button
                        onClick={clearWishlist}
                        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 font-semibold"
                    >
                        Clear Wishlist
                    </button>
                </>
            )}
        </div>
    );
}
