import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (product) => {
    setCart(cart.filter(item => item !== product));
  };

  const buyNow = (product) => {
    // Implement buy now functionality here
    alert(`Purchased ${product["Product Name"]}`);
    removeFromCart(product);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, buyNow }}>
      {children}
    </CartContext.Provider>
  );
};
