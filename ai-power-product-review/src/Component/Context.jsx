"use client";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("userData");
      setUser(storedData !== "undefined" ? JSON.parse(storedData) : {});
    }
  }, []);

  const logoutUser = async () => {
    try {
      const response = await axios.get("api/auth/logout");
      if (response.data.success) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("userData");
          localStorage.removeItem("ClientImage");
          window.location.reload();
        }
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        logoutUser,
        error,
        setError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
