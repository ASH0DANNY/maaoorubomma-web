"use client";

import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { UserAddress } from "../../types/user";

export default function AddressesPage() {
    const { user } = useAuth();
    const [addresses, setAddresses] = useState<UserAddress[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [newAddress, setNewAddress] = useState<UserAddress>({
        houseNumber: "",
        area: "",
        city: "",
        state: "",
        country: "India",
        pincode: ""
    });

    useEffect(() => {
        async function fetchAddresses() {
            if (!user) return;
            const ref = doc(db, "users", user.uid);
            const snap = await getDoc(ref);
            if (snap.exists() && snap.data().addresses) {
                setAddresses(snap.data().addresses);
            }
            setLoading(false);
        }
        fetchAddresses();
    }, [user]);

    const handleAddNewAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        const ref = doc(db, "users", user.uid);
        await setDoc(ref, {
            addresses: [...addresses, newAddress]
        }, { merge: true });

        setAddresses(prev => [...prev, newAddress]);
        setIsAddingNew(false);
        setNewAddress({
            houseNumber: "",
            area: "",
            city: "",
            state: "",
            country: "India",
            pincode: ""
        });
    };

    if (loading) {
        return <div>Loading addresses...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Saved Addresses</h2>
                <button
                    onClick={() => setIsAddingNew(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Add New Address
                </button>
            </div>

            {isAddingNew && (
                <div className="mb-8 border rounded-lg p-4">
                    <h3 className="font-medium mb-4">Add New Address</h3>
                    <form onSubmit={handleAddNewAddress} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                className="w-full border px-3 py-2 rounded"
                                placeholder="House Number"
                                value={newAddress.houseNumber}
                                onChange={e => setNewAddress(prev => ({ ...prev, houseNumber: e.target.value }))}
                                required
                            />
                            <input
                                className="w-full border px-3 py-2 rounded"
                                placeholder="Area"
                                value={newAddress.area}
                                onChange={e => setNewAddress(prev => ({ ...prev, area: e.target.value }))}
                                required
                            />
                            <input
                                className="w-full border px-3 py-2 rounded"
                                placeholder="City"
                                value={newAddress.city}
                                onChange={e => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                                required
                            />
                            <input
                                className="w-full border px-3 py-2 rounded"
                                placeholder="State"
                                value={newAddress.state}
                                onChange={e => setNewAddress(prev => ({ ...prev, state: e.target.value }))}
                                required
                            />
                            <input
                                className="w-full border px-3 py-2 rounded"
                                placeholder="Pincode"
                                value={newAddress.pincode}
                                onChange={e => setNewAddress(prev => ({ ...prev, pincode: e.target.value }))}
                                required
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => setIsAddingNew(false)}
                                className="px-4 py-2 border rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Save Address
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-4">
                {addresses.length === 0 ? (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Addresses Saved</h3>
                        <p className="text-gray-600">Add a new address to get started.</p>
                    </div>
                ) : (
                    addresses.map((address, idx) => (
                        <div key={idx} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-medium mb-1">Address {idx + 1}</p>
                                    <p className="text-gray-600">
                                        {address.houseNumber}, {address.area}
                                    </p>
                                    <p className="text-gray-600">
                                        {address.city}, {address.state} {address.pincode}
                                    </p>
                                    <p className="text-gray-600">{address.country}</p>
                                </div>
                                <div className="space-x-2">
                                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                                    <button className="text-red-600 hover:text-red-800">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
