import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="screen">
      {/* <div className="meals"> */}
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
      {/* </div> */}
    </div>
  );
}

export default App;
