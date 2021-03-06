import { db } from "../firebase/firebase-config"

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
    return db.collection("items").add(item)
  }

  update(id, value) {
    return db.collection("items").doc(id).update(value)
  }

  async delete(item) {
    console.log(`deleted : ${item.title}`)
    var item_query = db.collection("items").where("id", "==", item.id)
    item_query.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete()
      })
    })
  }
}

export default new ItemsDataService()
