import React, { useState, useEffect } from "react"
import { useFirebase } from "../contexts/FirebaseContext"
import firebaseApp from "../firebase/firebase-config"

// Icons
import { FaTrashAlt } from "react-icons/fa"

export default function ListComponent({ userLoggedIn, items, listLoading, deleteItem }) {
  if (!userLoggedIn) {
    return <>Not Logged In</>
  }

  if (listLoading) {
    return <>Loadings...</>
  }

  return (
    <ul>
      {items &&
        items.map(item => (
          <li key={item.id} id={item.id}>
            {item.title}
            <FaTrashAlt onClick={() => deleteItem(item)} />
          </li>
        ))}
    </ul>
  )
}
