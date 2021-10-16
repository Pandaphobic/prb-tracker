function App() {
  console.log(process.env.REACT_APP_API_KEY)

  return (
    <div className="App">
      <header className="App-header">
        <p>MAIN APP PAGE</p>
      </header>
      <body>
        <button>Login</button>
        <button>Logout</button>
        <br />
        <textarea>TEST DATA</textarea>
      </body>
    </div>
  )
}

export default App
