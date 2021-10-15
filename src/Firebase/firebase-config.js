// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkJRH47VbD6qnM7RoaWwkslOuZC7c601U",
  authDomain: "prb-tracker-prod.firebaseapp.com",
  projectId: "prb-tracker-prod",
  storageBucket: "prb-tracker-prod.appspot.com",
  messagingSenderId: "1046867506700",
  appId: "1:1046867506700:web:90e4aae4a552fd606fa029",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
