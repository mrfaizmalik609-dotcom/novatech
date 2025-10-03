// src/firebase.jsx
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfG3M--QIZLIMmzg1ZO9S0CHfyRB_v0mA",
  authDomain: "nova-tech-fbb54.firebaseapp.com",
  projectId: "nova-tech-fbb54",
  storageBucket: "nova-tech-fbb54.appspot.com",
  messagingSenderId: "910924302039",
  appId: "1:910924302039:web:5a8935823878a20a3d9292",
  measurementId: "G-9GMPQ8K6TF"
};

// ✅ Initialize Firebase (dobara init na ho)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export correctly
export { auth, db };
export default app;
