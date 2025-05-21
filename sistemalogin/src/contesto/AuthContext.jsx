import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const Authprovider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const login = (newToken) => {
    setToken(newToken);
  };
  const logout = () => {
    setToken(null);
  };
  const isAuthenticated = !!token;
  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
