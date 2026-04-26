// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAy756RBQa2M0gMqHkm-aiOp3n57Av6F7M",
  authDomain: "projetoatapp.firebaseapp.com",
  projectId: "projetoatapp",
  storageBucket: "projetoatapp.firebasestorage.app",
  messagingSenderId: "436649759017",
  appId: "1:436649759017:web:78a8b083a1d050569e6738",
  measurementId: "G-QSB13Q58DZ"
};

// Inicializa o Firebasee
const app = initializeApp(firebaseConfig);

// Exporta a instancia de autenticacao
export const auth = getAuth(app);

// Exporta a instancia do firestore
export const db = getFirestore(app);

export default app;
