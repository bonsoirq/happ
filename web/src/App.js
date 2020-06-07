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
import Account from 'pages/account';

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
            { currentAccount == null &&
              <>
                <Route exact path="/" component={Welcome} />
                <Route path="/login" component={Login} />
                <Route path="/register/success" component={RegisterSuccess} />
                <Redirect to="/" />
              </>
            }
            { currentAccount != null &&
              <>
                <Route exact path="/">
                  <Redirect to="/dashboard" />
                </Route>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/account" component={Account} />
                <Redirect to="/" />
              </>
            }
          </Switch>
        </div>
      </AccountContext.Provider>
    </Router>
  );
}

export default App;
