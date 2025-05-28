// una funzione che prenda tutte le password salvate di tutti gli utenti nel database e li "hashi" con un becrypt (query x ognuno degli elemeenti degli array)

import db from "../database/db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config()

async function cryptingPassword() {
  const salto = parseInt(process.env.VITE_SALTO);
  try {
    const salvaPassword = await db.many(` SELECT password, id FROM utenti `);
    salvaPassword.forEach(async (utente) => {
      const { password, id } = utente;
      const passwordCryptata = await bcrypt.hash(password, salto);
      await db.none(`UPDATE utenti SET password=$1 WHERE id=$2`, [passwordCryptata, id])
      
     console.log("operazione di criptaggio completata!")
    });
  } catch(error) {
     console.error(error)
  }
}
// cryptingPassword()
//  ATTENZIONE: NON ESEGUIRE PIù VOLTE