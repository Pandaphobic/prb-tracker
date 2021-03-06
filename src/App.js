import { useState, useEffect } from "react"
import { useFirebase } from "./contexts/FirebaseContext"
import ItemsDataService from "./services/FirestoreService"
import { v4 as uuidv4 } from "uuid"
import ListComponent from "./components/ListComponent"
import firebaseApp from "./firebase/firebase-config"

const ref = firebaseApp.firestore()

function App() {
  // Form and Item Adding
  const [inputEmail, setInputEmail] = useState("")
  const [inputPassword, setInputPassword] = useState("")
  const [itemTitle, setItemTitle] = useState()

  // Used at App level
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  // Referenced by ListComponent
  const [listLoading, setListLoading] = useState(false)
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [items, setItems] = useState([])
  // Firebase Context "import"
  const { signup, signin, currentUser, logout, signInWithGooglePopup } = useFirebase()

  /*       --------------AUTHENTICATION SECTION--------------      */
  const handleSignUp = async e => {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)

      await signup(inputEmail, inputPassword).then(cred => {
        // This is how to exposed the newly created userid / firebase unique identifier
        console.log(cred.user.uid)
      })
      // await signin(inputEmail, inputPassword)
    } catch {
      setError("Failed to create account")
    }
    setLoading(false)
  }

  const handleSignIn = async e => {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      console.log(inputEmail)
      await signin(inputEmail, inputPassword)
    } catch {
      setError("Failed to signin user")
    }
    setLoading(false)
  }

  const handleSignOut = e => {
    e.preventDefault()
    logout()
  }

  const handleEmailChange = e => {
    setInputEmail(e.target.value)
  }

  const handlePasswordChange = e => {
    setInputPassword(e.target.value)
  }

  const handleSignInWithGoogle = () => {
    signInWithGooglePopup()
  }

  /*    --------------FIRESTORE / ITEMS HANDLING--------------     */
  const handleInputTitleChange = e => {
    setItemTitle(e.target.value)
  }

  const handleAddItem = () => {
    let item = { uid: currentUser.uid, id: uuidv4(), title: itemTitle }
    ItemsDataService.create(item)
  }

  const deleteItem = id => {
    ItemsDataService.delete(id)
  }

  // Get items for the current user
  useEffect(() => {
    const updateItems = () => {
      setListLoading(true)
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
          setListLoading(false)
        })
    }
    updateItems()
  }, [currentUser])

  if (loading) {
    return <>Loading...</>
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>MAIN APP PAGE</p>
      </header>
      {error &&
        alert(error, () => {
          setError(null)
        })}
      {currentUser && <h1>{currentUser.email}</h1>}
      <form>
        {!currentUser && <input autoComplete="email" type="email" value={inputEmail} onChange={handleEmailChange}></input>}
        {!currentUser && <input autoComplete="current-password" type="password" value={inputPassword} onChange={handlePasswordChange}></input>}
        <br />
        <button disabled={currentUser} onClick={handleSignUp}>
          Sign Up
        </button>
        <button disabled={currentUser} onClick={handleSignIn}>
          Sign In
        </button>
        <button disabled={!currentUser} onClick={handleSignOut}>
          Sign Out
        </button>
      </form>
      <br />
      <label>google signin / signup</label>
      <br />
      <button disabled={currentUser} onClick={handleSignInWithGoogle}>
        Sign In With Google
      </button>
      {/* <br />
        <textarea value={`${inputEmail} ${inputPassword}`}></textarea> */}
      <br />
      <br />
      <h3>User Items</h3>
      <ListComponent listLoading={listLoading} items={items} userLoggedIn={userLoggedIn} deleteItem={deleteItem} />
      {/* <br /> */}
      {/* <button onClick={console.log("clicked Load Items button")}>Load Items</button> */}
      {/* <br /> */}
      <br />
      <h3>Add Item</h3>
      <label>Title</label>
      <input onChange={handleInputTitleChange} value={itemTitle} type="text" />
      <br />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  )
}

export default App
