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

app.get("/utente/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const utente = await db.one(`SELECT * FROM utenti WHERE id=$1`, [id]);
    res.status(200).json(utente);
  } catch (error) {
    res.status(404).json({ message: `utente non trovato ` });
  }
});

app.delete("/utente/:id", async (req, res) => {
  const { id } = req.params;
  try{
    await db.none(`DELETE FROM utenti WHERE id=$1`, [id]);
    res.status(200).json({ message: "Utente cancellato con successo" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.put("/utente/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, cognome, eta } = req.body;
  
  try {
  await db.none( `UPDATE utenti SET nome=$1, cognome=$2, eta=$3 WHERE id=$4`, [ nome, cognome, eta, id])
    return res.status(200).json({ message: "Utente modificato con successo" });
  } catch (error) {
    return res
      .status(404)
      .json({ message: error.message });
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
