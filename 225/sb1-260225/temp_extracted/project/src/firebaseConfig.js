import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "votre-projet.firebaseapp.com",
  projectId: "votre-projet",
  storageBucket: "votre-projet.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdefghijklm"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Exporter Firestore
export const firestore = getFirestore(app);
