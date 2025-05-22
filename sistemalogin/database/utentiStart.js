import { utenti } from "../server/utenti.js";
import db from "./db.js";

async function insert(array) {
  try {
    array.forEach(async (user) => {
      await db.none(
        ` INSERT INTO utenti ( nome, cognome, email, eta, password )
        VALUES
        ($1, $2, $3 , $4 , $5)
        `,
        [user.nome, user.cognome, user.email, user.eta, user.password]
      );
    });
    console.log("Operazione terminata con successo");
  } catch (error) {
    console.error("Operazione fallita", error);
  }
}

insert(utenti);
