"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function AccountPage() {
    const { user } = useAuth();
    const router = useRouter();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">My Account</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Profile Summary */}
                <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-4">Profile Details</h3>
                    <div className="space-y-2">
                        <p>
                            <span className="text-gray-600">Name: </span>
                            {user?.displayName || 'Not set'}
                        </p>
                        <p>
                            <span className="text-gray-600">Email: </span>
                            {user?.email || 'Not set'}
                        </p>
                        <p>
                            <span className="text-gray-600">Phone: </span>
                            {user?.phoneNumber || 'Not set'}
                        </p>
                    </div>
                    <button
                        onClick={() => router.push('/account/profile/edit')}
                        className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        Edit Profile
                    </button>
                </div>

                {/* Recent Orders */}
                <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-4">Recent Orders</h3>
                    <button
                        onClick={() => router.push('/account/orders')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        View All Orders
                    </button>
                </div>

                {/* Wishlist Summary */}
                <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-4">My Wishlist</h3>
                    <button
                        onClick={() => router.push('/account/wishlist')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        View Wishlist
                    </button>
                </div>
            </div>
        </div>
    );
}
