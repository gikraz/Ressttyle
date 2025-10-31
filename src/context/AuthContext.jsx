import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  const login = (userData) => {
    setUser(userData);

  };

  const logout = async () => {
    try {

      await fetch("https://re-style-backend-i9fa.vercel.app/logout", {
        method: "POST",
        credentials: "include", 
      });
    } catch (err) {
      console.error(err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
