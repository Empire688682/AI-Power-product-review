"use client";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [resetPwd, setResetPwd] = useState(false);
  const [formPhase, setFormPhase] = useState("signup");

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedData = localStorage.getItem("userData");
        setUser(storedData ? JSON.parse(storedData) : "");
      } catch (error) {
        console.error("Error parsing userData:", error);
        setUser("");
      }
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
        setShowSignup,
        showSignup,
        setIsOpen,
        isOpen,
        resetPwd,
        setResetPwd,
        formPhase,
        setFormPhase,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
