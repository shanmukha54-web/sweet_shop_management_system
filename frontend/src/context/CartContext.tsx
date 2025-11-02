import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  // add other backend fields if present (eg. stock)
}

export interface CartItem extends Sweet {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (sweet: Sweet) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (sweet: Sweet) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === sweet.id);
      if (existing) {
        return prev.map(i => (i.id === sweet.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...sweet, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};