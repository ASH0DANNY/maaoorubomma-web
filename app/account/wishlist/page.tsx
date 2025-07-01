"use client";

import { useWishlist } from "../../context/WishlistContext";
import { ProductCard } from "../../components/ProductCard";
import { EmptyWishlist } from "../../components/EmptyStateGraphics";

export default function WishlistPage() {
    const { items: products, clearWishlist } = useWishlist();

    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your Wishlist is Empty</h3>
                <p className="text-gray-600 mb-6">Save items you love and come back to them later.</p>
                <EmptyWishlist size="xl" />
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {products.map((product) => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            isGridView={true} 
                            linkToDetails
                            showQuickActions
                        />
                    ))}
                </div>
                {products.length > 0 && (
                    <button
                        onClick={clearWishlist}
                        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 font-semibold"
                    >
                        Clear Wishlist
                    </button>
                )}
            </div>
        </div>
    );
}
