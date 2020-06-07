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
import Paths from 'paths';

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
                <Route exact path={Paths.Root} component={Welcome} />
                <Route path={Paths.Login} component={Login} />
                <Route path={Paths.RegisterSuccess} component={RegisterSuccess} />
                <Redirect to={Paths.Root} />
              </>
            }
            { currentAccount != null &&
              <>
                <Route exact path={Paths.Root}>
                  <Redirect to={Paths.Dashboard} />
                </Route>
                <Route path={Paths.Dashboard} component={Dashboard} />
                <Route path={Paths.Account} component={Account} />
                <Redirect to={Paths.Root} />
              </>
            }
          </Switch>
        </div>
      </AccountContext.Provider>
    </Router>
  );
}

export default App;
