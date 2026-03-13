import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// ... real config ...
const firebaseConfig = {
  apiKey: "AIzaSyCvYZ6ZcI1rjkLF5KLKZMtzM-Q6ELwoB7A",
  authDomain: "vinicius-matoba.firebaseapp.com",
  projectId: "vinicius-matoba",
  storageBucket: "vinicius-matoba.firebasestorage.app",
  messagingSenderId: "169394728371",
  appId: "1:169394728371:web:ec1ce35f170ceb0244afc6",
  measurementId: "G-3972N11TME"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Forçar Long Polling de forma segura (evitando erro de re-inicialização)
let firestoreDb;
try {
  firestoreDb = initializeFirestore(app, {
    experimentalForceLongPolling: true,
    useFetchStreams: false,
  });
  console.log("Firestore inicializado com Long Polling.");
} catch (e) {
  // Se já foi inicializado (comum em HMR/Refresh), pega a instância existente
  firestoreDb = getFirestore(app);
  console.log("Firestore já estava inicializado, pegando instância existente.");
}

export const db = firestoreDb;
export const analytics = getAnalytics(app);
