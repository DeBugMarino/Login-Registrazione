import { Form, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function DashBoard() {
  const{user, logout} = useAuth()
  const navigazione = useNavigate();
  const [mod, setMod]= useState({})
  const [error, setError] =useState(false)
  const [apri, setApri]= useState(false)
  const [logOut, setLogout]= useState(false)


  function handleLogout(){
  logout()
  setLogout(true)
  // navigazione("/")
  }

  function handleChange(event){
  setMod((prev) => ({
    ...prev,
    [event.target.name]: event.target.value,
  }));
}
async function handleSubmit(event){
 event.preventDefault()
 try {
   const response = await fetch(`http://localhost:3000/utente/${user.id}`,
          { method: "PUT",
           headers: { "Content-type": "application/json" },
           body: JSON.stringify(mod),})
   const result = await response.json()
 } catch (error) {
   console.error("error")
   setError("modifica non riuscita")
 }

}

  return (
    <>
      <h1>Dashboard</h1>
      {user && (
        <div>
          <p>{user.nome}</p>
          <p>{user.email}</p>
          <p>{user.eta}</p>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={() => setApri(!apri)}>Modifica</button>
        </div>

      )}

     { apri && <Form onSubmit={handleSubmit}>
        <input
        name="nome"
        placeholder="nome"
        type="text"
        onChange={ handleChange}
        ></input>
        <input
        name="cognome"
        placeholder="cognome"
        type="text"
        onChange={ handleChange}
        ></input>
        <input
        name="eta"
        placeholder="eta"
        type="number"
        onChange={ handleChange}
        ></input>
        <input
        name="password"
        placeholder="password"
        type="password"
        onChange={ handleChange}
        ></input>
        <button type="submit">Modifica</button>
      </Form>}

      {error && <p>{error}</p>}
      {logOut && <p> Sei sicurro di voler uscire?</p>
      <button >Annulla</button>
      }
    </>
  );
}
