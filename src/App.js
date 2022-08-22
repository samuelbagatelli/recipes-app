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
    <div className="screen">
      <Switch>
        <LoginProvider>
          <RecipesProvider>
            <Route path="/foods/:foodsID" component={ Recipes } />
            <Route path="/drinks/:drinksID" component={ Recipes } />
            <Route exact path="/foods" component={ Recipes } />
            <Route exact path="/drinks" component={ Recipes } />
          </RecipesProvider>
          <Route exact path="/">
            <Login />
          </Route>
        </LoginProvider>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}
export default App;
