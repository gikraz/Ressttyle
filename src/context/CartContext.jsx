import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext.jsx";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, token } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  // Axios instance for backend
  const api = axios.create({
    baseURL: "https://re-style-backend-i9fa.vercel.app/",
    withCredentials: true,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  // Fetch cart items
  const fetchCart = async () => {
    if (!user || !token) return;
    try {
      const res = await api.get("/cart");
      setCart(res.data);
    } catch (err) {
      console.error("Fetch cart failed:", err);
      setCart([]);
    }
  };

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    if (!user || !token) return alert("Please login first!");
    try {
      const res = await api.post("/cart", { productId, quantity });
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
