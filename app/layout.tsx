// import { LocationProvider } from "@/context/LocationContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
import "./globals.css";
import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { LocationProvider } from "./context/LocationContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maaoorubomma",
  description:
    "Your one-stop destination for authentic Indian artisanal products and handicrafts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <LocationProvider>
              <Navbar />
              <main style={{ padding: "20px" }}>{children}</main>
              <Footer />
            </LocationProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
