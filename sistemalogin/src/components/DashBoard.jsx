import {  Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";


export default function DashBoard() {
  const{token, setToken, logout} = useAuth()
  const navigazione = useNavigate();
  const [mod, setMod]= useState({})
  const [error, setError] =useState(false)
  const [apri, setApri]= useState(false)
  const [logOut, setLogout]= useState(false)
  const [message, setMessage] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [user, setUser] = useState()
  
 

  function handleLogout(){
  logout()
  setLogout(true)
  
  }

  function handleChange(event){
  setMod((prev) => ({
    ...prev,
    [event.target.name]: event.target.value,
  }));
}

useEffect(() => {
  fetch(`http://localhost:3000/profile`, {
    headers:{
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => { return response.json()})
  .then((data) => { 
    setUser(data)
   
    
  })
  .catch((error) => {
    console.error(error)
    navigazione("/login")})
},[])


async function handleSubmit(event){
 event.preventDefault()

 try {
   const response = await fetch(`http://localhost:3000/utente/${user.id}`,
          { method: "PUT",
           headers: { "Content-type": "application/json" },
           body: JSON.stringify(mod),})
   const result = await response.json()
 setMessage("modifica effettuata con successo")
 setUser(result.user)
 localStorage.setItem("user", JSON.stringify(result.user))
 navigazione(0)
 setTimeout(() => {
   setApri(false);
 }, 5000);
 } catch (error) {
   console.error("error")
   setError("Modifica non riuscita")
 }

}
async function handleDelete(event){
  event.preventDefault()
  try {
    const response = await fetch(`http://localhost:3000/utente/${user.id}`,
           { method: "DELETE",
            headers: { "Content-type": "application/json" },})
    const result = await response.json()
    setMessage("Account eliminato con successo")
    localStorage.removeItem("user")
    // setCancel(true)
    navigazione("/login")
   
  } catch (error) {
    console.error("error")
    setError("Eliminazione non riuscita")
  }}

  return (
    <>
      <h1>Dashboard</h1>
      { user && (
        <div>
          <p>{user.nome}</p>
          <p>{user.email}</p>
          <p>{user.eta}</p>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={() => setApri(!apri)}>Modifica</button>
        </div>
      )}

      {apri && (
        <form onSubmit={handleSubmit}>
          <input
            name="nome"
            placeholder="nome"
            type="text"
            onChange={handleChange}
          ></input>
          <input
            name="cognome"
            placeholder="cognome"
            type="text"
            onChange={handleChange}
          ></input>
          <input
            name="eta"
            placeholder="eta"
            type="number"
            onChange={handleChange}
          ></input>
          <input
            name="password"
            placeholder="password"
            type="password"
            onChange={handleChange}
          ></input>
          <button type="submit">Modifica</button>
        </form>
      )}

      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
      {logOut && (
        <div>
          <p> Sei sicurro di voler uscire?</p>
          <button
            onClick={() => {
              setLogout(false);
            }}
          >
            Annulla
          </button>
          <Link to="/">Si</Link>
        </div>
      )}

      <div className="grid place-items-center h-dvh bg-zinc-950/80">
      <button onClick= {() => setCancel(true)}>Elimina account</button>
      </div>

      {cancel && (
        <div  id="popUp"
          className=" shadow-xl flex items-center justify-center z-50 bg-black bg-opacity-50">
          <p> Sei sicuro di voler eliminare l'account?</p>
          <button
          
            onClick={() => {
              setCancel(false);
            }}
          >
            Annulla
          </button>
          <button onClick={handleDelete}>Si</button>
        </div>
      )}
    </>
  );
}
