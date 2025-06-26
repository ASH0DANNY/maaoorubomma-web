"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const { user, loading, signOutUser } = useAuth();
    const router = useRouter();

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    if (!user) {
        router.push("/auth/signin");
        return null;
    }

    return (
        <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <div className="mb-4">
                <div className="font-medium">Name:</div>
                <div>{user.displayName || "-"}</div>
            </div>
            <div className="mb-4">
                <div className="font-medium">Email:</div>
                <div>{user.email}</div>
            </div>
            <button
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 font-semibold mt-6"
                onClick={async () => {
                    await signOutUser();
                    router.push("/");
                }}
            >
                Logout
            </button>
        </div>
    );
}
