"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { saveOrderToDb } from "../utils/ordersDb";
import type { CartItem } from "../types/cart";

const paymentMethods = [
    { value: "cod", label: "Cash on Delivery" },
    { value: "card", label: "Credit/Debit Card" },
    { value: "upi", label: "UPI/Netbanking" },
];

// Utility to deeply remove undefined/null fields
function cleanObject<T extends Record<string, any>>(obj: T): T {
    return Object.fromEntries(
        Object.entries(obj).filter(([, v]) => v !== undefined && v !== null)
    ) as T;
}

export default function PaymentPage() {
    const { items, total, clearCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();
    const [method, setMethod] = useState("cod");
    const [paying, setPaying] = useState(false);
    const [error, setError] = useState("");

    // Redirects moved to useEffect to avoid setState in render
    useEffect(() => {
        if (!user) {
            router.push("/auth/signin");
        } else if (!items.length) {
            router.push("/cart");
        }
    }, [user, items.length, router]);

    if (!user || !items.length) {
        return null;
    }

    const handlePay = async () => {
        setPaying(true);
        setError("");
        try {
            const sanitizedItems = items.map((item) => cleanObject({
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
                color: item.color,
                size: item.size,
                slug: item.slug,
            }));
            await saveOrderToDb(user.uid, cleanObject({
                items: sanitizedItems,
                total,
                paymentMethod: method,
                status: "completed",
                createdAt: undefined, // let saveOrderToDb add timestamp
            }));
            clearCart();
            router.push("/account?order=success");
        } catch (e: any) {
            setError(e.message || "Payment failed");
        } finally {
            setPaying(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-bold mb-6">Payment</h2>
            <div className="mb-6">
                <div className="font-medium mb-2">Select Payment Method:</div>
                <div className="space-y-2">
                    {paymentMethods.map((pm) => (
                        <label key={pm.value} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value={pm.value}
                                checked={method === pm.value}
                                onChange={() => setMethod(pm.value)}
                            />
                            {pm.label}
                        </label>
                    ))}
                </div>
            </div>
            <div className="flex gap-4 mt-8">
                <button
                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
                    onClick={handlePay}
                    disabled={paying}
                >
                    {paying ? "Processing..." : "Pay"}
                </button>
                <button
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 font-semibold"
                    onClick={() => router.push("/cart")}
                    disabled={paying}
                >
                    Cancel
                </button>
            </div>
            {error && <div className="text-red-600 text-center mt-4">{error}</div>}
        </div>
    );
}
