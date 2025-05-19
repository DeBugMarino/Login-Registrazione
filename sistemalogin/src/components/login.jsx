import { useState } from "react";

export default function Login() {
  const [data, setData] = useState({});
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);

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
      console.log(result);
      if (result.ok) {
        setMessage(result.message);
        setUser(result.user);
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
        //perchè user non si mostra a schermo?
      )}
    </>
  );
}
