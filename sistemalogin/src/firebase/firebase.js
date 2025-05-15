// Importa le funzioni necessarie dagli SDK di Firebase
import { initializeApp } from "firebase/app"; // Funzione per inizializzare l'app Firebase
import { getAnalytics } from "firebase/analytics"; // Funzione per attivare Google Analytics
import { getAuth } from "firebase/auth"; // Funzione per utilizzare l'autenticazione Firebase

// TODO: Aggiungi altri SDK di Firebase che ti servono (ad es. Firestore, Storage, ecc.)
// Puoi trovare la lista completa nella documentazione:
// https://firebase.google.com/docs/web/setup#available-libraries

// Configurazione dell'app Firebase
// Questi valori ti vengono forniti quando crei un progetto su Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDOmw60NqUwsgxr8sT7eGm0lCmfb1hjJ6w", // Chiave API pubblica del progetto (per comunicare con Firebase)
  authDomain: "login-c0db3.firebaseapp.com", // Dominio autorizzato per l'autenticazione (login)
  projectId: "login-c0db3", // ID univoco del progetto Firebase
  storageBucket: "login-c0db3.firebasestorage.app", // URL del bucket di Firebase Storage (per file, immagini, ecc.)
  messagingSenderId: "328278024986", // ID del mittente per i messaggi Firebase Cloud Messaging (FCM)
  appId: "1:328278024986:web:e717a508bcc306ed8c02a3", // ID univoco dell'app per identificarla nei servizi Firebase
  measurementId: "G-1ZS0E6482G", // ID per abilitare Google Analytics (opzionale)
};

// Inizializza l'app Firebase con la configurazione specificata sopra
const app = initializeApp(firebaseConfig);

// Inizializza Google Analytics (facoltativo, utile per raccogliere statistiche)
const analytics = getAnalytics(app);

// Inizializza il modulo di autenticazione (Firebase Auth)
// Esporta la costante `auth` così potrai usarla in altri file per login, registrazione, logout, ecc.
export const auth = getAuth(app);
