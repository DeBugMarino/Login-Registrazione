import pgPromise from "pg-promise";
import dotenv from "dotenv";
dotenv.config();
const dataBase = pgPromise();
const db = dataBase({
  host: "localhost",
  port: 5432,
  database: process.env.VITE_NOME_DATABASE,
  user: "postgres",
  password: process.env.VITE_PASSWORD_DATABASE,
});

db.none(
  `CREATE TABLE IF NOT EXISTS utenti (
  id SERIAL PRIMARY KEY, 
  nome TEXT NOT NULL, 
  cognome TEXT NOT NULL, 
  email TEXT NOT NULL UNIQUE,
   eta INT NOT NULL CHECK( eta >= 18), 
   password TEXT NOT NULL 
  )`
)
  .then(() => console.log("Tabella creata correttamente"))
  .catch((error) =>
    console.error("Errore durante la creazione della tabella", error)
  );

export default db;
