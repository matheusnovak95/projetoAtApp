// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGBybeRxkEYy7xQmSOzVhsyg_ibx3erRQ",
  authDomain: "atividade2-89358.firebaseapp.com",
  projectId: "atividade2-89358",
  storageBucket: "atividade2-89358.firebasestorage.app",
  messagingSenderId: "1010646869591",
  appId: "1:1010646869591:web:416bbad8955fd1cf59e512",
  measurementId: "G-8P0CKC5QHG"
};

// Inicializa o Firebasee
const app = initializeApp(firebaseConfig);

// Exporta a instancia de autenticacao
export const auth = getAuth(app);

// Exporta a instancia do firestore
export const db = getFirestore(app);

export default app;
