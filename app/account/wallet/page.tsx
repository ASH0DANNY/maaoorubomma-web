"use client";

import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function WalletPage() {
    const { user } = useAuth();
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWalletDetails() {
            if (!user) return;
            const ref = doc(db, "users", user.uid);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                setBalance(snap.data().walletBalance || 0);
                setTransactions(snap.data().walletTransactions || []);
            }
            setLoading(false);
        }
        fetchWalletDetails();
    }, [user]);

    if (loading) {
        return <div>Loading wallet details...</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Wallet & eGift Cards</h2>

            <div className="bg-yellow-50 rounded-lg p-6 mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Available Balance</p>
                        <p className="text-3xl font-bold">₹{balance.toLocaleString()}</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        Add Money
                    </button>
                </div>
            </div>

            <div>
                <h3 className="font-medium mb-4">Transaction History</h3>
                {transactions.length === 0 ? (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Transactions Yet</h3>
                        <p className="text-gray-600">Your transaction history will appear here.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {transactions.map((transaction, idx) => (
                            <div key={idx} className="border rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium">{transaction.type}</p>
                                        <p className="text-sm text-gray-600">{transaction.date}</p>
                                    </div>
                                    <div className={`text-lg font-medium ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
