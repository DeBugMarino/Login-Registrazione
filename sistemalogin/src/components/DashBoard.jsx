import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DashBoard() {
  const { user, logout } = useAuth();
  const navigazione = useNavigate();

  function handleLogout() {
    if (confirm("sei sicuro di effettuare il logout")) {
      logout();
      setTimeout(() => {
        navigazione("/");
      }, 1500);
    } else {
      ("You pressed Cancel!");
    }
  }

  function handleDelete() {}

  return (
    <>
      <h1>Dashboard</h1>
      {user && (
        <div>
          <p>{user.nome}</p>
          <p>{user.email}</p>
          <p>{user.eta}</p>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleDelete}> cancella il tuo account</button>
        </div>
      )}
    </>
  );
}
