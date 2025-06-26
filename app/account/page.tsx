"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { UserAddress } from "../types/user";

export default function AccountPage() {
    const { user, loading, signOutUser } = useAuth();
    const router = useRouter();
    const [address, setAddress] = useState<UserAddress>({
        houseNumber: "",
        area: "",
        city: "",
        state: "",
        country: "India",
        pincode: ""
    });
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (user) {
            const fetchAddress = async () => {
                const ref = doc(db, "users", user.uid);
                const snap = await getDoc(ref);
                if (snap.exists() && snap.data().address) {
                    setAddress((prev) => ({ ...prev, ...snap.data().address } as UserAddress));
                }
            };
            fetchAddress();
        }
        // eslint-disable-next-line
    }, [user]);

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!user) {
        router.push("/auth/signin");
        return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setSuccess("");
        await setDoc(doc(db, "users", user.uid), { address }, { merge: true });
        setSaving(false);
        setSuccess("Address updated successfully!");
    };

    return (
        <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Account</h2>
            <div className="mb-4">
                <div className="font-medium">Name:</div>
                <div>{user.displayName || "-"}</div>
            </div>
            <div className="mb-4">
                <div className="font-medium">Email:</div>
                <div>{user.email}</div>
            </div>
            <form onSubmit={handleSave} className="space-y-4 mt-6">
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <input
                    className="w-full border px-3 py-2 rounded"
                    name="houseNumber"
                    placeholder="House Number"
                    value={address.houseNumber}
                    onChange={handleChange}
                    required
                />
                <input
                    className="w-full border px-3 py-2 rounded"
                    name="area"
                    placeholder="Area"
                    value={address.area}
                    onChange={handleChange}
                    required
                />
                <input
                    className="w-full border px-3 py-2 rounded"
                    name="city"
                    placeholder="City"
                    value={address.city}
                    onChange={handleChange}
                    required
                />
                <input
                    className="w-full border px-3 py-2 rounded"
                    name="state"
                    placeholder="State"
                    value={address.state}
                    onChange={handleChange}
                    required
                />
                <input
                    className="w-full border px-3 py-2 rounded"
                    name="country"
                    placeholder="Country"
                    value={address.country}
                    onChange={handleChange}
                    required
                />
                <input
                    className="w-full border px-3 py-2 rounded"
                    name="pincode"
                    placeholder="Pincode"
                    value={address.pincode}
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
                    disabled={saving}
                >
                    {saving ? "Saving..." : "Save Address"}
                </button>
                {success && <div className="text-green-600 text-center">{success}</div>}
            </form>
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
