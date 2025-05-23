import { utenti } from "../server/utenti.js";
import db from "./db.js";



async function insertUtenti(array) {
    try {
      array.forEach(async(user) =>{
        await db.none(
        `INSERT INTO  utenti (nome, cognome, email, eta, password) 
         VALUES ( $1, $2, $3, $4, $5)`,
        [user.nome, user.cognome, user.email, user.eta, user.password])
      })
        console.log("Utenti inseriti con successo");
    } catch (error) {
        console.error("Errore durante l'inserimento degli utenti:", error);
    }
}

insertUtenti(utenti)