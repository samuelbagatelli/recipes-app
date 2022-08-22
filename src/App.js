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
          <Route exact path="/foods" component={ Recipes } />
          <Route exact path="/drinks" component={ Recipes } />
          <Route
            path="/foods/:foodID"
            render={ (props) => <Recipes { ...props } id="12" /> }
          />
          <Route
            path="/drinks/:drinkID"
            render={ (props) => <Recipes { ...props } id="12" /> }
          />
        </div>
      </Switch>
    </RecipesProvider>
  );
}

export default App;
