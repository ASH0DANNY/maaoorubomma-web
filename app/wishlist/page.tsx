"use client";

import { useWishlist } from "../context/WishlistContext";
import Link from "next/link";
import Image from "next/image";
import { EmptyWishlist } from "../components/EmptyStateGraphics";

export default function WishlistPage() {
    const { items, removeItem, clearWishlist } = useWishlist();

    return (
        <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
            {items.length === 0 ? (

                // <div className="text-gray-500">Your wishlist is empty.</div>
                <EmptyWishlist size="xl" />

            ) : (
                <>
                    <ul className="space-y-4 mb-6">
                        {items.map((item) => (
                            <li key={item.productId} className="flex items-center gap-4 border-b pb-3">
                                <div className="relative w-16 h-16">
                                    <Image src={item.image} alt={item.name} fill className="object-cover rounded" />
                                </div>
                                <div className="flex-1">
                                    <Link href={`/product/${item.slug}`} className="font-semibold hover:text-blue-600">
                                        {item.name}
                                    </Link>
                                    <div className="text-sm text-gray-600">₹{item.price}</div>
                                </div>
                                <button
                                    onClick={() => removeItem(item.productId)}
                                    className="text-red-600 hover:text-red-800 text-xs"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
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
