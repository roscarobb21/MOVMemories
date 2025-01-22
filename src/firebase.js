// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1qsM9brE4B-UgSO5yMI6sHfPKDs0UWtQ",
  authDomain: "movmemories-834fc.firebaseapp.com",
  projectId: "movmemories-834fc",
  storageBucket: "movmemories-834fc.firebasestorage.app",
  messagingSenderId: "590841030170",
  appId: "1:590841030170:web:b409e3a1082c591e51d3a3",
  measurementId: "G-H06GKZWZ3V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, collection, addDoc, query, where, getDocs };
