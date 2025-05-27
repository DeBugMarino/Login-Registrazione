// una funzione che prenda tutte le password salvate di tutti gli utenti nel database e li "hashi" con un becrypt (query x ognuno degli elemeenti degli array)

import db from "./db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

async function cryptingPassword() {
  const salto = parseInt(process.env.VITE_SALTO);
  try {
    const salvaPassword = await db.many(` SELECT password FROM utenti `);
    salvaPassword.forEach(async (password) => {
      const passwordCryptata = await bcrypt.hash(password, salto);
      //MATCH CON ID X PASSWORD
    });
  } catch {}
}
