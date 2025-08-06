// src/context/AppContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import CryptoJS from "crypto-js";

const AppContext = createContext();

const SECRET_KEY = "your-secret-key"; // 🔐 Use same key in login and context

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  const API_BASE_URL = "https://withread-api-vah1.onrender.com";

  useEffect(() => {
    const encryptedToken = sessionStorage.getItem("token");
    if (encryptedToken) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
        const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

        if (decryptedToken) {
          setToken(decryptedToken);
        } else {
          // If decryption fails, remove invalid token
          sessionStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Token decryption failed", error);
        sessionStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <AppContext.Provider value={{ loading, setLoading, API_BASE_URL, token, setToken }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
