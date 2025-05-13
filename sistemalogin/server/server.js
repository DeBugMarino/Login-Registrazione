import express from "express";
import cors from "cors";
import { utenti } from "./utenti.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  if (utenti) {
    res.json(utenti);
  } else if (utenti.length) {
    res.status(404).send("errore utenti non trovati");
  } else {
    res.status(404).send("errore la pagina non è stata trovata");
  }
});

app.get("/utente/:id", (req, res) => {
  const { id } = req.params;
  const users = utenti.find((user) => user.id == id);
  if (users) {
    res.json(utenti);
  } else {
    res.status(404).send("id non trovato");
  }
});

app.post("/utente", (req, res) => {
  const { id, nome, cognome, email, eta, password } = req.body;
  const userExist = utenti.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );
  if (userExist) {
    return res.status(404).json({ message: "utente già registrato" });
  } else {
    const newUser = {
      id: id,
      nome: nome,
      cognome: cognome,
      email: email,
      eta: eta,
      password: password,
    };
    utenti.push(newUser);
    return res.status(201).json({ message: "utente registrato con successo" });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const userExist = utenti.find(
      (utente) =>
        utente.email.toLowerCase() === email.toLowerCase() &&
        utente.password === password
    );
    if (userExist) {
      return res
        .status(200)
        .json({ message: "login effettuato con successo", user: userExist });
    } else {
      return res.status(400).json({ message: "credenziali errate" });
    }
  } else {
    return res.status(404).json({ message: "inserisci email e password" });
  }
});

app.listen(PORT, () => {
  console.log(`avviato il server su http://localhost:${PORT} `);
});
