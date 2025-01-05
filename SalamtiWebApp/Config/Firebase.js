// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAkCAc9ix8RUZ4zigg6bXWkBctwiEXtCE",
  authDomain: "salamti-30fd8.firebaseapp.com",
  projectId: "salamti-30fd8",
  storageBucket: "salamti-30fd8.firebasestorage.app",
  messagingSenderId: "377252386097",
  appId: "1:377252386097:web:8d2c97df686004e8ec0c10",
  measurementId: "G-RVWWYJZFYT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
