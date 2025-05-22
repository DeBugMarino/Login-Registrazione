import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
    const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? JSON.parse(storedToken) : null;
  });

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
        setToken(result.token);
        localStorage.setItem("token", JSON.stringify(result.token)); // <-- aggiunto
        return result.token;
      
      } else {
        setMessage(result.message);
        setToken(null);
        console.log("else");
      }
    } catch (error) {
      console.log("catch");
      console.error(error);
      setMessage("errore");
      setToken(null);
    }
  }
  function logout(){
    localStorage.removeItem("token")

  }

  return (
    <AuthContext.Provider value={{ token, login, message, logout , setToken}}>
      {children}
    </AuthContext.Provider>
  );
};
