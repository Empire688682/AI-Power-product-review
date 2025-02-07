"use client";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const router = useRouter();
    const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("userData"))) || {};
    }
  }, []);

  const logoutUser = async () => {
    try {
      const response = await axios.get("api/auth/logout");
      if (response.data.success) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("userData");
          router.push("/");
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
