import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

export default function Recipes() {
  const { foodData, drinkData, foodCategory, drinkCategory } = useContext(RecipesContext);
  const history = useHistory();
  const { location: { pathname } } = history;

  const renderRecipes = () => {
    const quantLimit = 12;
    if (pathname === '/foods') {
      return foodData
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
    } if (pathname === '/drinks') {
      return drinkData
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
    }
  };

  const renderCategories = () => {
    const quantLimit = 5;
    let category = null;
    if (pathname === '/foods') category = foodCategory;
    if (pathname === '/drinks') category = drinkCategory;
    return category
      .filter((_recipe, index) => index < quantLimit)
      .map(({ strCategory }, index) => (
        <button
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          key={ `${strCategory}-${index}` }
        >
          { strCategory }
        </button>
      ));
  };

  return (
    <>
      <div>
        { foodCategory && drinkCategory ? renderCategories() : null }
      </div>
      <div>
        { drinkData && foodData ? renderRecipes() : null }
      </div>
    </>
  );
}
