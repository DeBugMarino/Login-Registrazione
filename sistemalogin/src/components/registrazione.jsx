import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registrazione() {
  const [data, setData] = useState({ id: 30 });
  const [message, setMessage] = useState(null);
  const navigazione = useNavigate();

  function handleChange(event) {
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/utente", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        setTimeout(() => {
          navigazione("/login");
        }, 5000);
      } else {
        setMessage(result.message);
      }
    } catch {
      setMessage(result.message);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input name="nome" onChange={handleChange} type="text"></input>
        <input name="cognome" onChange={handleChange} type="text"></input>
        <input name="email" onChange={handleChange} type="email"></input>
        <input name="eta" onChange={handleChange} type="number"></input>
        <input name="password" onChange={handleChange} type="password"></input>
        <button type="submit">Registrati</button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
}
