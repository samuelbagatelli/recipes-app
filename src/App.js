import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './context/RecipesProvider';
import Recipes from './pages/Recipes';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <div className="screen">
          <Route path="/foods/:foodID" component={ Recipes } />
          <Route path="/drinks/:drinkID" component={ Recipes } />
          <Route exact path="/foods" component={ Recipes } />
          <Route exact path="/drinks" component={ Recipes } />
        </div>
      </Switch>
    </RecipesProvider>
  );
}

export default App;
