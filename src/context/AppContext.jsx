import React, { createContext, useContext, useState } from "react";

// Create the context
const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = "https://withread-api-vah1.onrender.com";
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OGUzZTNiMWY5YjhjZjdmNThhOTgwMiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1NDE2MjQ5NSwiZXhwIjoxNzU0NzY3Mjk1fQ.14Nf22hGhHAd1ipzbYdQu3XG16aHQd7F8fQ8h8LQ8C8'

  return (
    <AppContext.Provider value={{ loading, setLoading, API_BASE_URL, token }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easier usage
export const useApp = () => useContext(AppContext);
