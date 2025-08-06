import React, { createContext, useContext, useState, useEffect } from "react";
import CryptoJS from "crypto-js"; // Don't forget to install this

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null); 

  const API_BASE_URL = "https://withread-api-vah1.onrender.com";

  useEffect(() => {
    const encryptedToken = sessionStorage.getItem("token");
    if (encryptedToken) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedToken, "your-secret-key");
        const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
        setToken(decryptedToken);
      } catch (error) {
        console.error("Token decryption failed", error);
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
