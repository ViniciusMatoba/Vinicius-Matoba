import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
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

// Initialize Firestore with Force Long Polling for stability
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
});
export const analytics = getAnalytics(app);
