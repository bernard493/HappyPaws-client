import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setAuthChecked(true);
  }, []);

  const login = (userToken) => {
    Cookies.set("token", userToken, { expires: 1 });
    setToken(userToken);
  };

  const logout = () => {
    Cookies.remove("token");
    setToken(null);
  };

  const isAuthenticated = !!token;
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, authChecked }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
