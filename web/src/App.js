import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import 'bulma/css/bulma.min.css';

import Navbar from './components/navbar'
import Welcome from './pages/welcome'
import AccountContext from 'contexts/account-context';
import AccountService from 'services/account-service';
import { noop } from 'lib/noop';
import Login from 'pages/login';
import Dashboard from 'pages/dashboard';
import RegisterSuccess from 'pages/register-success';

function App() {
  const [currentAccount, setCurrentAccount] = useState(null)

  useEffect(() => {
    AccountService
      .current()
      .then(setCurrentAccount)
      .catch(noop)
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
            <Route path="/login">
            { currentAccount != null
                ? <Redirect to="/" />
                : <Login />
              }
            </Route>
            <Route path="/register/success">
              <RegisterSuccess />
            </Route>
            <Route path="/">
              { currentAccount != null
                ? <Dashboard />
                : <Welcome />
              }
            </Route>
          </Switch>
        </div>
      </AccountContext.Provider>
    </Router>
  );
}

export default App;
