// src/context/CartContext.jsx
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Message state for popup
  const [cartMessage, setCartMessage] = useState("");
  const [showCartMessage, setShowCartMessage] = useState(false);

  // Add to cart or increase quantity if exists
  const addToCart = (product, quantity) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });

    setCartMessage(`${product.name} (qty ${quantity}) added to cart`);
    setShowCartMessage(true);

    setTimeout(() => {
      setShowCartMessage(false);
    }, 3000);
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // Update quantity for product in cart
  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartMessage,
        showCartMessage,
        setShowCartMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
