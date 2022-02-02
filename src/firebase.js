// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXpOdf_cR_Vx-lHERNcEO8cyLaAr70yIE",
  authDomain: "react-my-dict.firebaseapp.com",
  projectId: "react-my-dict",
  storageBucket: "react-my-dict.appspot.com",
  messagingSenderId: "845440968486",
  appId: "1:845440968486:web:259516aca396b9183703e7",
  measurementId: "G-Z0JCNV585B"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
