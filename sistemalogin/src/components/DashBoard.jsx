import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";

export default function DashBoard() {
  const { user, logout } = useAuth();
  const navigazione = useNavigate();
  const [modifica, setModifica] = useState(false);
  const [data, setData] = useState(user);

  const notificaSuccesso = (msg) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  function handleLogout() {
    if (confirm("Sei sicuro di effettuare il logout ?")) {
      logout();
      setTimeout(() => {
        notificaSuccesso("Logout avvenuto con successo!");
        navigazione("/login");
      }, 500);
    } else {
      ("You pressed Cancel!");
    }
  }

  function handleModifica() {
    setModifica(!modifica);
  }

  function handleChange(event) {
    setData((prevData) => ({
      ...prevData,
      [event.target.name]:
        event.target.name === "eta"
          ? parseInt(event.target.value)
          : event.target.value,
    }));
  }

  async function handleSave(event) {
    event.preventDefault();
    const idUtente = 30;
    try {
      const response = await fetch(`http://localhost:3000/utente/${idUtente}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        console.log("Modifica dati avvenuta con successo ");
        localStorage.setItem("user", JSON.stringify(data));
        notificaSuccesso("Account modificato con successo!");
        setModifica(false);
      } else {
        console.log("Errore durante la modifica dei dati");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(event) {
    event.preventDefault();
    const idUtente = 30;
    if (confirm("Sei sicuro di eliminare il tuo account? ")) {
      try {
        const response = await fetch(
          `http://localhost:3000/utente/${idUtente}`,
          {
            method: "DELETE",
          }
        );
        const result = await response.json();
        if (response.ok) {
          console.log("utente cancellato con successo");
          localStorage.removeItem("user");
          notificaSuccesso("Account eliminato con successo!");
          navigazione("/");
        } else {
          console.log("Utente non trovato");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Operazione annullata");
    }
  }

  return (
    <>
      <h1>Dashboard</h1>
      {modifica ? (
        <>
          <form onSubmit={handleSave}>
            <label htmlFor="nome">Nome</label>
            <br />{" "}
            <input
              type="text"
              name="nome"
              value={data.nome}
              onChange={handleChange}
            />
            <br /> <label htmlFor="Cognome">Cognome</label>
            <br />
            <input
              type="text"
              name="cognome"
              value={data.cognome}
              onChange={handleChange}
            />
            <br /> <label htmlFor="eta">Età</label>
            <br />{" "}
            <input
              type="number"
              name="eta"
              value={data.eta}
              onChange={handleChange}
            />
            <br /> <button type="submit">Modifica dati</button>
          </form>
        </>
      ) : (
        <button onClick={handleModifica}>Modifica i tuoi dati</button>
      )}

      {user && (
        <div>
          <p>{user.nome}</p>
          <p>{user.email}</p>
          <p>{user.eta}</p>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleDelete}> Cancella il tuo account</button>
        </div>
      )}
    </>
  );
}
