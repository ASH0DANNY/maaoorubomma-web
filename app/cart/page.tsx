'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';
import { useAuth } from "@/app/context/AuthContext";

export default function CartPage() {
    const { items, removeItem, updateQuantity, total, itemCount } = useCart();
    const { user, loading } = useAuth();

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">Your cart is empty</p>
                    <Link
                        href="/"
                        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Your Cart ({itemCount} items)</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                    {items.map((item) => (
                        <div
                            key={`${item.productId}-${item.color}-${item.size}`}
                            className="flex flex-col sm:flex-row items-start gap-4 border-b border-gray-200 py-4"
                        >
                            <div className="relative w-24 h-24 flex-shrink-0">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover rounded-md"
                                />
                            </div>

                            <div className="flex-grow">
                                <Link
                                    href={`/product/${item.slug}`}
                                    className="text-lg font-semibold hover:text-blue-600"
                                >
                                    {item.name}
                                </Link>

                                <div className="text-sm text-gray-600 mt-1">
                                    {item.color && <span className="mr-2">Color: {item.color}</span>}
                                    {item.size && <span>Size: {item.size}</span>}
                                </div>

                                <div className="flex items-center gap-4 mt-2">
                                    <div className="flex items-center border rounded-md">
                                        <button
                                            onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                                            className="px-3 py-1 hover:bg-gray-100"
                                        >
                                            -
                                        </button>
                                        <span className="px-3 py-1 border-x">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                            className="px-3 py-1 hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeItem(item.productId)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Remove
                                    </button>
                                </div>

                                <div className="mt-2 font-semibold">
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:w-1/3">
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                        </div>

                        <div className="border-t pt-4 mb-4">
                            <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                        </div>

                        {!user ? (
                            <Link
                                href="/auth/signin"
                                className="w-full block bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 text-center font-semibold"
                            >
                                Sign in to Checkout
                            </Link>
                        ) : (
                            <Link
                                href="/payment"
                                className="w-full block bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 text-center font-semibold"
                            >
                                Proceed to Checkout
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
