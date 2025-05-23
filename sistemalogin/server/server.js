import express from "express";
import cors from "cors";
import { utenti } from "./utenti.js";
import jwt from "jsonwebtoken";
import db from "../database/db.js";

const app = express();
const PORT = 3000;
const secretKey = "my_secret_key";

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const users = await db.many(`SELECT * FROM utenti`);
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Errore durante la richiesta ${error.message}` });
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

app.delete("/utente/:id", (req, res) => {
  const { id } = req.params;
  const users = utenti.find((idUtente) => idUtente.id == id);
  if (users) {
    const indice = utenti.indexOf(users);
    utenti.splice(indice, 1);
    res.status(200).send({ message: "Utente cancellato con successo" });
  } else {
    res.status(404).send({ message: "utente non trovato" });
  }
});

app.put("/utente/:id", (req, res) => {
  const { id } = req.params;
  const { nome, cognome, eta } = req.body;
  const user = utenti.find((idUtente) => idUtente.id == id);

  if (user) {
    user.nome = nome;
    user.cognome = cognome;
    user.eta = eta;
    return res.status(200).send({ message: "Utente modificato con successo" });
  } else {
    return res
      .status(404)
      .send({ message: "Modifica non avvenuta correttamente" });
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
      const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });
      return res
        .status(200)
        .json({ message: "login effettuato con successo", token });
    } else {
      return res.status(400).json({ message: "credenziali errate" });
    }
  } else {
    return res.status(404).json({ message: "inserisci email e password" });
  }
});

app.get("/dashboard", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({ message: "token mancante" });
  }
  const token = auth.split(" ")[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "token non valido" });
    }
    const userExist = utenti.find((x) => x.email === decoded.email);
    res.json({ userExist });
  });
});

app.listen(PORT, () => {
  console.log(`avviato il server su http://localhost:${PORT} `);
});
