import React from 'react';
import logo from './images/logo-transparent.png';
import 'bulma/css/bulma.min.css';

import Navbar from './components/navbar'

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
