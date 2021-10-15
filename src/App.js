function App() {
  console.log(process.env.REACT_APP_API_KEY);

  return (
    <div className="App">
      <header className="App-header">
        <p>MAIN APP PAGE{process.env.REACT_APP_API_KEY}</p>
      </header>
    </div>
  );
}

export default App;
