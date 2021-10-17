import { useState } from "react"
import { useFirebase } from "./contexts/FirebaseContext"

function App() {
  const [inputEmail, setInputEmail] = useState("")
  const [inputPassword, setInputPassword] = useState("")
  const [itemTitle, setItemTitle] = useState()

  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  const { signup, signin, currentUser, logout, signInWithGooglePopup, dbAddItem, items } = useFirebase()

  const handleSignUp = async e => {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)

      await signup(inputEmail, inputPassword).then(cred => {
        // This is how to exposed the newly created userid / firebase unique identifier
        console.log(cred.user.uid)
      })
      await signin(inputEmail, inputPassword)
    } catch {
      setError("Failed to create account")
    }
    setLoading(false)
  }

  const handleSignIn = e => {
    e.preventDefault()
  }

  const handleSignOut = e => {
    e.preventDefault()
    logout()
  }

  const handleEmailChange = e => {
    setInputEmail(e.target.value)
  }

  const handleItemChange = e => {
    setItemTitle(e.target.value)
  }

  const handlePasswordChange = e => {
    setInputPassword(e.target.value)
  }

  const handleSignInWithGoogle = () => {
    signInWithGooglePopup()
  }

  const handleAddItem = () => {
    let item = { uid: currentUser.uid, title: itemTitle }
    dbAddItem(item)
    console.log(item)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>MAIN APP PAGE</p>
      </header>
      <body>
        {currentUser && <h1>{currentUser.email}</h1>}
        <input type="email" value={inputEmail} onChange={handleEmailChange}></input>
        <input type="password" value={inputPassword} onChange={handlePasswordChange}></input>
        <br />
        <button disabled={currentUser} onClick={handleSignUp}>
          Sign Up
        </button>
        <button disabled={currentUser} onClick={handleSignIn}>
          Sign In
        </button>
        <button onClick={handleSignOut}>Sign Out</button>
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
        <br />
        <ul>{items && items.forEach(item => <li>{item.title}</li>)}</ul>
        <br />
        <br />
        <h3>Add Item</h3>
        <label>Title</label>
        <input onChange={handleItemChange} value={itemTitle} type="text" />
        <button onClick={handleAddItem}>Add Item</button>
      </body>
    </div>
  )
}

export default App
