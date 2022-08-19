import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function FoodRecipes() {
  const { foodData, loading } = useContext(RecipesContext);
  const quantLimit = 12;
  const renderRecipes = () => foodData.meals
    .filter((_recipe, index) => index < quantLimit)
    .map((recipe, index) => (
      <section data-testid={ `${index}-recipe-card` } key={ recipe.idMeal }>
        <img
          src={ recipe.strMealThumb }
          alt={ `foto da receita ${recipe.strMeal}` }
          data-testid={ `${index}-card-img` }
          className="w-25"
        />
        <span data-testid={ `${index}-card-name` }>{ recipe.strMeal }</span>
      </section>
    ));

  return (
    <div>
      Eu sou o Receitas
      { !loading && foodData ? renderRecipes() : null }
    </div>
  );
}
