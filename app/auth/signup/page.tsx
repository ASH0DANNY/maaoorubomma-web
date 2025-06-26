"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function SignUpPage() {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            // Save user details to Firestore
            await setDoc(doc(db, "users", userCredential.user.uid), {
                uid: userCredential.user.uid,
                name,
                email,
                mobile,
                createdAt: new Date().toISOString(),
            });
            router.push("/");
        } catch (err: any) {
            setError(err.message || "Failed to sign up");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSignUp}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                {error && <div className="mb-4 text-red-600">{error}</div>}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        type="text"
                        className="w-full border px-3 py-2 rounded"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Mobile Number</label>
                    <input
                        type="tel"
                        className="w-full border px-3 py-2 rounded"
                        value={mobile}
                        onChange={e => setMobile(e.target.value)}
                        required
                        pattern="[0-9]{10}"
                        maxLength={10}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        className="w-full border px-3 py-2 rounded"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        className="w-full border px-3 py-2 rounded"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
                    disabled={loading}
                >
                    {loading ? "Signing up..." : "Sign Up"}
                </button>
                <div className="mt-4 text-center">
                    Already have an account?{' '}
                    <a href="/auth/signin" className="text-blue-600 hover:underline">Sign In</a>
                </div>
            </form>
        </div>
    );
}
