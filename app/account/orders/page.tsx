"use client";

import { useEffect, useState } from "react";
import { UserOrder } from "../../types/user";
import { useAuth } from "../../context/AuthContext";
import { getOrdersFromDb } from "../../utils/ordersDb";

export default function OrdersPage() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<UserOrder[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            if (!user) {
                setLoading(false);
                return;
            }
            try {
                const userOrders = await getOrdersFromDb(user.uid);
                setOrders(userOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, [user]);

    if (loading) {
        return <div>Loading orders...</div>;
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Yet</h3>
                <p className="text-gray-600">When you make your first order, it will appear here.</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">All Orders</h2>
            <div className="space-y-4">
                {orders.map((order, idx) => (
                    <div key={idx} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-medium">Order #{orders.length - idx}</h3>
                                <p className="text-sm text-gray-600">
                                    {order.createdAt?.toDate
                                        ? order.createdAt.toDate().toLocaleDateString()
                                        : String(order.createdAt)
                                    }
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="font-medium">₹{order.total.toLocaleString()}</div>
                                <div className="text-sm text-gray-600">{order.items.length} items</div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t">
                            <div className="text-sm">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                    ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                        order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                            'bg-blue-100 text-blue-800'}`}
                                >
                                    {order.status}
                                </span>
                            </div>
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
