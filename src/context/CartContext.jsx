import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext.jsx";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, token } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    if (!user || !token) return;
    try {
      const res = await axios.get("http://localhost:3000/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (err) {
      console.error("Fetch cart failed:", err);
      setCart([]);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!user || !token) return alert("Please login first!");
    try {
      const res = await axios.post(
        "http://localhost:3000/cart",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data);
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user, token]);

  return (
    <CartContext.Provider value={{ cart, addToCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
