import pgPromise from "pg-promise";

const dataBase = pgPromise();
const db = dataBase({
  host: "localhost",
  port: 5432,
<<<<<<< HEAD
  database: "postgres",
=======
  database: "postgres2",
>>>>>>> ca26fba60b4fa3fab5c0ec21553b3b8af375c6f3
  user: "postgres",
  password: "postgres",
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
