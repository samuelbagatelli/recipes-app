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

function App() {
  return (
    <div className="screen">
      <Switch>
        <Route path="/foods/:foodsID" component={ Recipes } />
        <Route path="/drinks/:drinksID" component={ Recipes } />
        <Route exact path="/foods" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        {/* <Route path="/foods" exact component={ Foods } />
        <Route path="/drinks" exact component={ Drinks } /> */}
        <Route path="/profile" exact component={ Profile } />
        <Route path="/done-recipes" exact component={ DoneRecipes } />
        <Route path="/favorite-recipes" exact component={ FavoriteRecipes } />
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}
export default App;
