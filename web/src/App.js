import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import 'bulma/css/bulma.min.css';

import Navbar from './components/navbar'
import Welcome from './pages/welcome'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="">
            <Welcome />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
