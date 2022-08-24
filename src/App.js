import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Recipes from './pages/Recipes';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import AppProvider from './provider/AppProvider';

function App() {
  return (
    <div className="screen">
      <AppProvider>
        <Switch>
          <Route path="/foods/:foodsID" component={ Recipes } />
          <Route path="/drinks/:drinksID" component={ Recipes } />
          <Route exact path="/foods" component={ Recipes } />
          <Route exact path="/drinks" component={ Recipes } />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route exact path="/" component={ Login } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </AppProvider>
    </div>
  );
}
export default App;
