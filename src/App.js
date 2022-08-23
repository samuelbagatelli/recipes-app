import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';

function App() {
  return (
    <Switch>
      <div className="meals">
        <span className="logo">TRYBE</span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object>
        <Route exact path="/foods">
          <Footer />
        </Route>
        <Route exact path="/drinks">
          <Footer />
        </Route>
        <Route exact path="/profile">
          <Footer />
        </Route>
      </div>
    </Switch>
  );
}

export default App;
