import express from "express";
import cors from "cors";
import { utenti } from "./utenti.js";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 3000;
const secretKey = "abcde12345";

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
    res.json(users);
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
      const token = jwt.sign(
        {
          email: email,
        },
        secretKey,
        { expiresIn: "1h" }
      );

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

app.get("/profile", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({ msg: "token mancante" });
  }
  const token = auth.split(" ")[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ msg: "token non valido" });
    }
    const userExist = utenti.find((u) => u.email === decoded.email);
    res.json(userExist);
  });
});

app.put("/utente/:id", (req, res) => {
  const { id } = req.params;
  const { nome, cognome, eta, password } = req.body;
  const userExist = utenti.find((user) => user.id == id);
  if (userExist) {
    userExist.nome = nome;
    userExist.cognome = cognome;
    userExist.eta = eta;
    userExist.password = password;
    return res
      .status(200)
      .json({ message: "Modifica effettuata con successo", user: userExist });
  } else {
    return res.status(404).json({ message: "Id non trovato" });
  }
});

app.delete("/utente/:id", (req, res) => {
  const { id } = req.params;
  const userIndex = utenti.findIndex((user) => user.id == id);
  if (userIndex !== -1) {
    utenti.splice(userIndex, 1);
    return res.status(200).json({ message: "Utente eliminato con successo" });
  } else {
    return res.status(404).json({ message: "Id non trovato" });
  }
});

app.listen(PORT, () => {
  console.log(`avviato il server su http://localhost:${PORT} `);
});
