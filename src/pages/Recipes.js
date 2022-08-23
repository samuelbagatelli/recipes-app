import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails';
import AppContext from '../context/AppContext';
import Drinks from './Drinks';
import Foods from './Foods';

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
    setSearching,
    setRecipeID,
  } = useContext(AppContext);
  const { searching } = useContext(AppContext);
  const history = useHistory();
  const { location: { pathname } } = history;

  const fetchCategories = async (category) => {
    if (pathname.includes('/foods')) {
      try {
        if (pathname.includes('/foods')) {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
          const data = await response.json();
          setFoodFilteredData(data.meals);
        }
      } catch (error) {
        // console.log(error);
      }
    } else {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await response.json();
        setDrinkFilteredData(data.drinks);
      } catch (error) {
        // console.log(error);
      }
    }
    setFilterActive(!filterActive);
  };

  const renderRecipes = () => {
    const quantLimit = 12;
    if (pathname.includes('/foods')) {
      const listData = filterActive ? foodFilteredData : foodData;
      return listData
        .filter((_recipe, index) => index < quantLimit)
        .map((recipe, index) => (
          <Link
            to={ `/foods/${recipe.idMeal}` }
            key={ recipe.idMeal }
            onClick={ () => setSearching(true) }
          >
            <section data-testid={ `${index}-recipe-card` }>
              <img
                src={ recipe.strMealThumb }
                alt={ `foto da receita ${recipe.strMeal}` }
                data-testid={ `${index}-card-img` }
                className="tamanho"
              />
              <span data-testid={ `${index}-card-name` }>{ recipe.strMeal }</span>
            </section>
          </Link>
        ));
    } if (pathname.includes('/drinks')) {
      const listData = filterActive ? drinkFilteredData : drinkData;
      return listData
        .filter((_recipe, index) => index < quantLimit)
        .map((recipe, index) => (
          <Link to={ `/drinks/${recipe.idDrink}` } key={ recipe.idDrink }>
            <section data-testid={ `${index}-recipe-card` }>
              <img
                src={ recipe.strDrinkThumb }
                alt={ `foto da receita ${recipe.strDrink}` }
                data-testid={ `${index}-card-img` }
                className="tamanho"
              />
              <span data-testid={ `${index}-card-name` }>{ recipe.strDrink }</span>
            </section>
          </Link>
        ));
    }
  };

  const renderCategories = () => {
    const quantLimit = 5;
    let category = null;
    if (pathname.includes('/foods')) category = foodCategory;
    if (pathname.includes('/drinks')) category = drinkCategory;
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

  const renderAllButton = () => (
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
  );

  return (
    <div>
      { pathname === '/foods' && <Foods /> }
      { pathname === '/drinks' && <Drinks /> }
      <div>
        {
          drinkData && foodData && !searching ? renderRecipes() : RecipeDetails()
        }
      </div>
      <div>
        { foodCategory && drinkCategory && !searching ? renderCategories() : null }
        { !searching && renderAllButton() }
      </div>
    </div>
  );
}
