import React, { useState, useEffect } from "react"
import { useFirebase } from "../contexts/FirebaseContext"
import firebaseApp from "../firebase/firebase-config"

const ref = firebaseApp.firestore()

export default function ListComponent() {
  const { currentUser } = useFirebase()

  const [loading, setLoading] = useState(false)
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  function getItems() {
    setLoading(true)
    if (!currentUser) {
      setUserLoggedIn(false)
      return
    }
    setUserLoggedIn(true)
    ref
      .collection("items")
      .where("uid", "==", currentUser.uid)
      .onSnapshot(querySnapshot => {
        const snapshotItems = []
        querySnapshot.forEach(doc => {
          snapshotItems.push(doc.data())
        })
        setItems(snapshotItems)
        setLoading(false)
      })
  }

  useEffect(() => {
    getItems()
  }, [currentUser])

  const [items, setItems] = useState([])

  if (!userLoggedIn) {
    return <>Not Logged In</>
  }

  if (loading) {
    return <></>
  }

  return <ul>{items && items.map(item => <li id={item.id}>{item.title}</li>)}</ul>
}
