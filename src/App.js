import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginProvider from './providers/LoginProvider';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="screen">
      <Switch>
        <Route exact path="/">
          <LoginProvider>
            <Login />
          </LoginProvider>
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
