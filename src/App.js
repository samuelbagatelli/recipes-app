import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginProvider from './providers/LoginProvider';

function App() {
  return (
    <div className="screen">
      {/* <div className="meals"> */}
      <Switch>
        <Route exact path="/">
          <LoginProvider>
            <Login />
          </LoginProvider>
        </Route>
      </Switch>
      {/* </div> */}
    </div>
  );
}

export default App;
