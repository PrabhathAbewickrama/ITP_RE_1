// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "pawfectcare-208ab.firebaseapp.com",
  projectId: "pawfectcare-208ab",
  storageBucket: "pawfectcare-208ab.firebasestorage.app",
  messagingSenderId: "273602145020",
  appId: "1:273602145020:web:964a739a9d9e6257600579"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);