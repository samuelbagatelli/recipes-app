import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import AppContext from '../context/AppContext';
import Header from '../components/Header';
import Card from '../components/Card';

function Drinks() {
  const { drinks } = useContext(AppContext);

  if (drinks.length === 1) return <Redirect to={ `/drinks/${drinks[0].idDrink}` } />;

  const MAX_RECIPES_TO_SHOW = 12;

  return (
    <main>
      <Header />
      { drinks
        .filter((_recipe, index) => index + 1 <= MAX_RECIPES_TO_SHOW)
        .map((recipe, index) => (
          <Card
            key={ recipe.idDrink }
            image={ recipe.strDrinkThumb }
            title={ recipe.strDrink }
            category={ recipe.strCategory }
            index={ index }
          />
        )) }
    </main>
  );
}

export default Drinks;
