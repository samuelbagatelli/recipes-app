import React, { useContext } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import Card from '../components/Card';

function Foods() {
  const { meals, checkLength } = useContext(AppContext);

  const MaxRecipes = 12;
  return (
    <main>
      {checkLength()}
      <Header />
      { meals
        .filter((_recipe, index) => index + 1 <= MaxRecipes)
        .map((recipe, index) => (
          <Card
            key={ recipe.idMeal }
            image={ recipe.strMealThumb }
            title={ recipe.strMeal }
            category={ recipe.strCategory }
            index={ index }
          />
        )) }
    </main>
  );
}

export default Foods;
