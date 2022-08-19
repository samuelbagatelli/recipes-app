import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function DrinkRecipes() {
  const { drinkData, loading } = useContext(RecipesContext);
  const quantLimit = 12;
  const renderRecipes = () => drinkData.drinks
    .filter((_recipe, index) => index < quantLimit)
    .map((recipe, index) => (
      <section data-testid={ `${index}-recipe-card` } key={ recipe.idDrink }>
        <img
          src={ recipe.strDrinkThumb }
          alt={ `foto da receita ${recipe.strDrink}` }
          data-testid={ `${index}-card-img` }
          className="w-25"
        />
        <span data-testid={ `${index}-card-name` }>{ recipe.strDrink }</span>
      </section>
    ));

  return (
    <div>
      { !loading && drinkData ? renderRecipes() : null }
    </div>
  );
}
