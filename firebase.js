import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAqMVnxGikQ4ilzOICIk8dO0Fy-kOvXfPc",
  authDomain: "rideshare-6c04b.firebaseapp.com",
  projectId: "rideshare-6c04b",
  storageBucket: "rideshare-6c04b.appspot.com",
  messagingSenderId: "393013386646",
  appId: "1:393013386646:web:37ad05621c399a110611b7",
  measurementId: "G-LMD6SXEJBS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }