// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiMSJ6yunb5LAI-liCakXQ8Dzk4mIrgjs",
  authDomain: "smart-deals-3b80a.firebaseapp.com",
  projectId: "smart-deals-3b80a",
  storageBucket: "smart-deals-3b80a.firebasestorage.app",
  messagingSenderId: "861164267985",
  appId: "1:861164267985:web:7f6fc5ebfcde9202d058f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);