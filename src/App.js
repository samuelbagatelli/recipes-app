import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import RecipesProvider from './context/RecipesProvider';
import Recipes from './pages/Recipes';
import LoginProvider from './context/LoginProvider';
import NotFound from './pages/NotFound';

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
