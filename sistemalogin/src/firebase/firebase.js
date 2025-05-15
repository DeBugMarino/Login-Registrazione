// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOmw60NqUwsgxr8sT7eGm0lCmfb1hjJ6w",
  authDomain: "login-c0db3.firebaseapp.com",
  projectId: "login-c0db3",
  storageBucket: "login-c0db3.firebasestorage.app",
  messagingSenderId: "328278024986",
  appId: "1:328278024986:web:e717a508bcc306ed8c02a3",
  measurementId: "G-1ZS0E6482G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inizializza il modulo auth e esportalo

export const auth = getAuth(app);
