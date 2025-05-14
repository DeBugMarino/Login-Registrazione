import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [data, setData] = useState({});
  const [message, setMessage] = useState(null);
  const navigazione = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  function handleChange(event) {
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

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
        console.log(user);
        setTimeout(() => {
          navigazione("/dashboard");
        }, 5000);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("errore");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="email"
          placeholder="email"
          type="email"
        ></input>
        <input
          onChange={handleChange}
          name="password"
          placeholder="password"
          type="password"
        ></input>
        <button type="submit">login</button>
      </form>
      {message && <p>{message}</p>}
      {user && (
        <div>
          <p>{user.nome}</p>
          <p>{user.email}</p>
          <p>{user.eta}</p>
        </div>
      )}
    </>
  );
}
