// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrciE9zPzbv2veKYcdvdPUYsSLdsqmrcI",
  authDomain: "mediqueue-app.firebaseapp.com",
  projectId: "mediqueue-app",
  storageBucket: "mediqueue-app.firebasestorage.app",
  messagingSenderId: "194668726711",
  appId: "1:194668726711:web:c48b8d79b9cfed5311c032",
  measurementId: "G-PGNY3HD2PF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export default app;