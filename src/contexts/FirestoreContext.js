import React, { useContext, useState, useEffect } from "react"
import { itemsRef, firebaseAuth } from "../firebase/firebase-config"

const FirestoreContext = React.createContext()

export function FirebaseProvider({ children }) {
  // STATE
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])

  firebaseAuth.onAuthStateChanged(user => {
    if (user) {
    }
  })

  const value = {}

  return <FirestoreContext.Provider value={value}>{!loading && children}</FirestoreContext.Provider>
}
