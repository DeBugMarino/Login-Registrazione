import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [data, setData] = useState({});
  const { user, login, message } = useAuth();
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
      const logged = await login(data);
      console.log(logged);
      if (logged) {
        setTimeout(() => {
          navigazione("/dashboard");
        }, 5000);
      }
    } catch (error) {
      console.error(error);
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
      {/* {user && (
        <div>
          <p>{user.nome}</p>
          <p>{user.email}</p>
          <p>{user.eta}</p>
        </div>
<<<<<<< HEAD
        //perchè user non si mostra a schermo?
      )}
=======
      )} */}
>>>>>>> 517d998e8192af3c4dfa0c6be2947052752acf35
    </>
  );
}
