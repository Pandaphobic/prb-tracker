import React, { useState, useEffect } from "react"
import firebaseApp from "../firebase/firebase-config"

const ref = firebaseApp.firestore().collection("items")

export default function ListComponent() {
  const [loading, setLoading] = useState(false)
  function getItems() {
    setLoading(true)
    ref.onSnapshot(querySnapshot => {
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
  }, [])

  const [items, setItems] = useState([])

  if (loading) {
    return <>Loading...</>
  }

  return <ul>{items && items.map(item => <li id={item.id}>{item.title}</li>)}</ul>
}
