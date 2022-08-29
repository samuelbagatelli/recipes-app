import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import AppContext from '../context/AppContext';
import Header from '../components/Header';
import Card from '../components/Card';

function Drinks() {
  const { drinks } = useContext(AppContext);

  if (drinks.length === 1) return <Redirect to={ `/drinks/${drinks[0].idDrink}` } />;

  const MaxRecipes = 12;
  console.log(drinks);

  return (
    <main>
      <Header />
      { drinks
        .filter((_recipe, index) => index + 1 <= MaxRecipes)
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
