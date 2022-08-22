import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginProvider from './providers/LoginProvider';
import HeaderProvider from './providers/HeaderProvider';
import NotFound from './pages/NotFound';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div className="screen">
      <Switch>
        <Route exact path="/">
          <LoginProvider>
            <Login />
          </LoginProvider>
        </Route>
        <HeaderProvider>
          <Route path="/foods" exact component={ Foods } />
          <Route path="/drinks" exact component={ Drinks } />
          <Route path="/profile" exact component={ Profile } />
          <Route path="/done-recipes" exact component={ DoneRecipes } />
          <Route path="/favorite-recipes" exact component={ FavoriteRecipes } />
        </HeaderProvider>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
