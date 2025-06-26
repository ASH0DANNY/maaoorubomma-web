"use client";

import { ReactNode } from "react";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { LocationProvider } from "./context/LocationContext";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <LocationProvider>
            <Navbar />
            <main style={{ padding: "20px" }}>{children}</main>
            <Footer />
          </LocationProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
