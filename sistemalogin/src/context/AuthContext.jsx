import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState(null);

  async function login(data) {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        setUser(result.user);
        console.log("if");
        console.log(result.user);
      } else {
        setMessage(result.message);
        setUser(null);
        console.log("else");
      }
    } catch (error) {
      console.log("catch");
      console.error(error);
      setMessage("errore");
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, message }}>
      {children}
    </AuthContext.Provider>
  );
};
