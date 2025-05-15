import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function Login() {
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  function handleChange(event) {
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      // Il login è automatico, Firebase salva tutto
      navigate("/dashboard");
    } catch (error) {
      console.error("Login fallito", error.message);
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
      )} */}
    </>
  );
}
