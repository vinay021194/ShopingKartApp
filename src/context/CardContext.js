import React, { createContext, useState } from "react";

// Create a new context for the cart
export const CartContext = createContext();

// Create a provider component to manage the cart state and actions
export const CartProvider = ({ children }) => {
  // State to hold the cart items
  const [cart, setCart] = useState([]);

  // Add an item to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if the product is already in the cart
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // If the product is already in the cart, increase its quantity
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If the product is not in the cart, add it with a quantity of 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove an item from the cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Update the quantity of an item in the cart
  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Calculate the total price of all items in the cart
  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Calculate the total number of items in the cart
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Provide the cart state and actions to the rest of the application
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
