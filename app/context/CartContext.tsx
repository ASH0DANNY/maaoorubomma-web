'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { CartItem } from '../types/cart';
import { getCartFromCookie, setCartToCookie, clearCartCookie } from "../utils/cartCookie";

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load cart from cookie/localStorage on mount
  useEffect(() => {
    let loaded: CartItem[] = [];
    if (typeof window !== "undefined") {
      loaded = getCartFromCookie();
      if (!loaded.length) {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) loaded = JSON.parse(savedCart);
      }
      setItems(loaded);
      setLoading(false);
    }
  }, []);

  // Save cart to localStorage and cookie whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('cart', JSON.stringify(items));
      setCartToCookie(items);
    }
  }, [items, loading]);

  const addItem = (item: CartItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(i =>
        i.productId === item.productId &&
        i.color === item.color &&
        i.size === item.size
      );

      if (existingItem) {
        return currentItems.map(i =>
          i.productId === item.productId && i.color === item.color && i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }

      return [...currentItems, item];
    });
  };

  const removeItem = (productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    clearCartCookie();
    if (typeof window !== "undefined") {
      localStorage.removeItem('cart');
    }
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  if (loading) {
    return <div className="w-full text-center py-8 text-gray-500">Loading app...</div>;
  }

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      total,
      itemCount,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
