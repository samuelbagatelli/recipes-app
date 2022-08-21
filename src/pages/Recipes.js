import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

export default function Recipes() {
  const { foodData,
    drinkData,
    foodCategory,
    drinkCategory,
    filterActive,
    setFilterActive,
    foodFilteredData,
    setFoodFilteredData,
    drinkFilteredData,
    setDrinkFilteredData,
    filterValue,
    setFilterValue,
  } = useContext(RecipesContext);
  const history = useHistory();
  const { location: { pathname } } = history;

  const fetchCategories = async (category) => {
    if (pathname === '/foods') {
      try {
        if (pathname === '/foods') {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
          const data = await response.json();
          setFoodFilteredData(data.meals);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await response.json();
        setDrinkFilteredData(data.drinks);
      } catch (error) {
        console.log(error);
      }
    }
    setFilterActive(!filterActive);
  };

  const renderRecipes = () => {
    const quantLimit = 12;
    if (pathname === '/foods') {
      const listData = filterActive ? foodFilteredData : foodData;
      return listData
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
      const listData = filterActive ? drinkFilteredData : drinkData;
      return listData
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
          onClick={ () => {
            fetchCategories(strCategory);
            setFilterValue(strCategory);
          } }
          disabled={ filterActive ? strCategory !== filterValue : false }
        >
          { strCategory }
        </button>
      ));
  };

  return (
    <>
      <div>
        { foodCategory && drinkCategory ? renderCategories() : null }
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => {
            setFilterValue('');
            setFilterActive(false);
          } }
        >
          All
        </button>
      </div>
      <div>
        {
          drinkData && foodData ? renderRecipes() : null
        }
      </div>
    </>
  );
}
