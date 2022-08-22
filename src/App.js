import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import RecipesProvider from './context/RecipesProvider';
import Recipes from './pages/Recipes';
import LoginProvider from './providers/LoginProvider';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="screen">
      <Switch>
          <RecipesProvider>
            <Route path="/foods" component={ Recipes } />
            <Route path="/drinks" component={ Recipes } />
          </RecipesProvider>
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
