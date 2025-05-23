import pgPromise from 'pg-promise';

const dataBase = pgPromise()
const db = dataBase({
    host: 'localhost',
    port: 5432,
    database: 'postgress',
    user: 'postgres',
    password: 'postgres'
});

export default db;

db.none(`CREATE TABLE IF NOT EXISTS utenti(
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    cognome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    eta INTEGER NOT NULL CHECK (eta >= 18) ,
    password TEXT NOT NULL
    )`)
    .then(() => {
    console.log("Tabella utenti creata con successo")})
    .catch((error) => {
    console.log("Errore nella creazione della tabella utenti", error)})

