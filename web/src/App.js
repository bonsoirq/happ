import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import 'bulma/css/bulma.min.css';

import Navbar from './components/navbar'
import Welcome from './pages/welcome'
import AccountContext from 'contexts/account-context';
import AccountService from 'services/account-service';

function App() {
  const [currentAccount, setCurrentAccount] = useState(null)

  useEffect(() => {
    AccountService
      .current()
      .then(setCurrentAccount)
      .catch(() => {})
  }, [])

  return (
    <Router>
      <AccountContext.Provider value={{
        currentAccount,
        setCurrentAccount,
      }}>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="">
              <Welcome />
            </Route>
          </Switch>
        </div>
      </AccountContext.Provider>
    </Router>
  );
}

export default App;
