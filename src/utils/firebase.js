// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBmh9e1wrKgjWzNzOCzhp3k7yGpAkeYsU",
  authDomain: "netflixgpt-d1b9b.firebaseapp.com",
  projectId: "netflixgpt-d1b9b",
  storageBucket: "netflixgpt-d1b9b.appspot.com",
  messagingSenderId: "443255903145",
  appId: "1:443255903145:web:a86546a7d88cb7c1ef6ab8",
  measurementId: "G-RMDVLK71RG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();