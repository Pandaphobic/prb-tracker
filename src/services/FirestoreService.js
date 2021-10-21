import { itemsRef } from "../firebase/firebase-config"
import { collection, query, where, getDocs } from "firebase/firestore"

const db = itemsRef

class ItemsDataService {
  async getAll() {
    const items = []
    db.collection("items")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          items.push(doc.data())
        })
      })
      .catch(error => {
        console.log("Error getting items: ", error)
      })

    return items
  }

  create(item) {
    return db.add(item)
  }

  update(id, value) {
    return db.doc(id).update(value)
  }

  delete(id) {
    return db.doc(id).delete()
  }
}

export default new ItemsDataService()
