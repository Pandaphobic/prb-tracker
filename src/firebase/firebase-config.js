// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"

import "firebase/compat/auth"
import "firebase/compat/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkJRH47VbD6qnM7RoaWwkslOuZC7c601U",
  authDomain: "prb-tracker-prod.firebaseapp.com",
  projectId: "prb-tracker-prod",
  storageBucket: "prb-tracker-prod.appspot.com",
  messagingSenderId: "1046867506700",
  appId: "1:1046867506700:web:90e4aae4a552fd606fa029"
}

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

// References
export const auth = firebaseApp.auth()
export default app
