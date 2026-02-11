// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
