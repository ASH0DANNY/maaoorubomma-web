"use client";

import AccountLayout from "../components/layouts/AccountLayout";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/auth/signin");
        }
    }, [loading, user, router]);

    if (loading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    if (!user) {
        return null;
    }

    return <AccountLayout>{children}</AccountLayout>;
}
