import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
    const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
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
        setUser(result.user);
        localStorage.setItem("user", JSON.stringify(result.user)); // <-- aggiunto
        return result.user;
      // }
      // if (response.ok) {
      //   setMessage(result.message);
      //   setUser(result.user);
      //   console.log("if");
      //   console.log(result.user);
      //   return result.user;
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
  function logout(){
    localStorage.removeItem("user")

  }

  return (
    <AuthContext.Provider value={{ user, login, message, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
