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
import LoginProvider from './context/LoginProvider';
import RecipesProvider from './context/RecipesProvider';
import HeaderProvider from './providers/HeaderProvider';

function App() {
  return (
    <LoginProvider className="screen">
      <RecipesProvider>
        <HeaderProvider>
          <Switch>
            <Route path="/foods/:foodsID" component={ Recipes } />
            <Route path="/drinks/:drinksID" component={ Recipes } />
            <Route exact path="/foods" component={ Recipes } />
            <Route exact path="/drinks" component={ Recipes } />
            <Route path="/profile" exact component={ Profile } />
            <Route path="/done-recipes" exact component={ DoneRecipes } />
            <Route path="/favorite-recipes" exact component={ FavoriteRecipes } />
            <Route exact path="/" component={ Login } />
            <Route path="*" component={ NotFound } />
          </Switch>
        </HeaderProvider>
      </RecipesProvider>
    </LoginProvider>
  );
}
export default App;
