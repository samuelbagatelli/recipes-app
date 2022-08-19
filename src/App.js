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
          <Route path="/foods" component={ Recipes } />
          <Route path="/drinks" component={ Recipes } />
        </div>
      </Switch>
    </RecipesProvider>
  );
}

export default App;
