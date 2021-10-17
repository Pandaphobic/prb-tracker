import React, { useContext, useState, useEffect } from "react"
import { db, firebaseAuth, googleAuthProvider } from "../firebase/firebase-config"

const FirebaseContext = React.createContext()

export function useFirebase() {
  return useContext(FirebaseContext)
}

export function FirebaseProvider({ children }) {
  // AUTHENTICATION STUFF
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])

  function signup(email, password) {
    return firebaseAuth.createUserWithEmailAndPassword(email, password)
  }

  function signin(email, password) {
    return firebaseAuth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return firebaseAuth.signOut()
  }

  function resetPassword(email) {
    return firebaseAuth.sendPasswordResetEmail(email)
  }

  function signInWithGooglePopup() {
    return firebaseAuth.signInWithPopup(googleAuthProvider)
  }

  // FIRESTORE STUFF
  let collectionRef
  let unsubscribe

  firebaseAuth.onAuthStateChanged(user => {
    if (user) {
    }
  })

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        // when signed in

        setCurrentUser(user)
        collectionRef = db.collection("items")
        unsubscribe = collectionRef.where("uid", "==", user.uid).onSnapshot(querySnapshot => {
          setItems(
            querySnapshot.docs.map(doc => {
              return doc.data()
            })
          )
        })
      } else {
        // when not signed in
        setCurrentUser(null)
      }

      setLoading(false)
      console.log(items)
    })
    let unsubscribe
  }, [currentUser])

  function dbAddItem(item) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        db.collection("items").add(item)
      }
    })
    let unsubscribe
  }

  const value = {
    currentUser,
    items,
    signup,
    signin,
    logout,
    resetPassword,
    signInWithGooglePopup,
    dbAddItem
  }

  return <FirebaseContext.Provider value={value}>{!loading && children}</FirebaseContext.Provider>
}
