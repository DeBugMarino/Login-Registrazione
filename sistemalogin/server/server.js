import express from "express";
import cors from "cors";
import { utenti } from "./utenti.js";
import jwt from "jsonwebtoken";
import db from "../database/db.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

dotenv.config();
const app = express();
const PORT = parseInt(process.env.VITE_PORT) || 3000;
const secretKey = process.env.VITE_JSON_SECRET_KEY;
const salto = parseInt(process.env.VITE_SALTO);

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
  try {
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
    await db.none(`UPDATE utenti SET nome=$1, cognome=$2, eta=$3 WHERE id=$4`, [
      nome,
      cognome,
      eta,
      id,
    ]);
    return res.status(200).json({ message: "Utente modificato con successo" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

app.post("/utente", async (req, res) => {
  const { nome, cognome, email, eta, password } = req.body;

  try {
    const passwordCryptata = await bcrypt.hash(password, salto);
    await db.none(
      `INSERT INTO utenti ( nome, cognome, email , eta , password )
      VALUES
      ($1, $2, $3, $4, $5)
      `,
      [nome, cognome, email, eta, passwordCryptata]
    );
    return res.status(201).json({ message: "utente registrato con successo" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const userExist = await db.oneOrNone(
        `SELECT * FROM utenti WHERE email=$1`,
        [email]
      );
      if (userExist) {
        const hashedPassword = userExist.password;
        const isTrue = await bcrypt.compare(password, hashedPassword);
        if (isTrue) {
          const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });
          return res
            .status(200)
            .json({ message: "login effettuato con successo", token });
        } else {
          return res.status(400).json({ message: "credenziali errate" });
        }
      } else {
        return res.status(404).json({ message: "credenziali errate" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    return res.status(404).json({ message: "inserisci email e password" });
  }
});

app.get("/dashboard", async (req, res) => {
  const auth = req.headers.authorization;

  try {
    if (!auth) {
      return res.status(401).json({ message: "token mancante" });
    }
    const token = auth.split(" ")[1];
    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "token non valido" });
      }
      const userExist = await db.one("SELECT * FROM utenti WHERE email=$1 ", [
        decoded.email,
      ]);
      res.json({ userExist });
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

app.post("/:id/uploads", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { mimetype, buffer } = req.file;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "Non hai caricato nessun file" });
    }
    await db.none(`UPDATE utenti SET immagine=$1, mime_type=$2 WHERE id=$3 `, [
      buffer,
      mimetype,
      id,
    ]);
    res.status(201).json({ message: "File caricato con successo" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "errore nel caricamento del file: " + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`avviato il server su http://localhost:${PORT} `);
});
