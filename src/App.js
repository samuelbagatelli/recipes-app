import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './context/RecipesProvider';
import FoodRecipes from './components/FoodRecipes';
import DrinkRecipes from './components/DrinkRecipes';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <div className="screen">
          <Route path="/foods" component={ FoodRecipes } />
          <Route path="/drinks" component={ DrinkRecipes } />
        </div>
      </Switch>
    </RecipesProvider>
  );
}

export default App;
