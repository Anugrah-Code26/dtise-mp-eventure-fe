// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAn0rCZED_FWxRICX6-j6kwGiPJLzProW4",
  authDomain: "dti-eventure-be.firebaseapp.com",
  projectId: "dti-eventure-be",
  storageBucket: "dti-eventure-be.firebasestorage.app",
  messagingSenderId: "139197402983",
  appId: "1:139197402983:web:f24ef63df23b480b5e69c2",
  measurementId: "G-KK9EB6SX4P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
