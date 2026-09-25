// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "queenai-60d59.firebaseapp.com",
    projectId: "queenai-60d59",
    storageBucket: "queenai-60d59.firebasestorage.app",
    messagingSenderId: "811265419572",
    appId: "1:811265419572:web:cc2bbbfba70f06ae81dd61",
    measurementId: "G-3YGNYS5WEK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();