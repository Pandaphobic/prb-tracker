import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

// Sign in provider
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
// export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()
// export const githubAuthProvider = new firebase.auth.GithubAuthProvider()

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
export const firebaseAuth = firebaseApp.auth()
export var itemsRef = firebaseApp.firestore()
export default firebaseApp
