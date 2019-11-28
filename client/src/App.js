import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/Home'; 
import Login from './components/Home/login'; 
import './scss/styles.scss';
function App() {
  return (
   <Router>
          <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/Login" component={Login} />
          </Switch>
    </Router>
  );
}

export default App;
