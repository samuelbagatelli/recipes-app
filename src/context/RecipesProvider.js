import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import useFetch from '../hooks/useFetch';

export default function RecipesProvider({ children }) {
  const [foodData, setFoodData] = useState(null);
  const [foodFilteredData, setFoodFilteredData] = useState(null);
  const [drinkData, setDrinkData] = useState(null);
  const [drinkFilteredData, setDrinkFilteredData] = useState(null);
  const [foodCategory, setFoodCategory] = useState(null);
  const [drinkCategory, setDrinkCategory] = useState(null);
  const [filterActive, setFilterActive] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  useFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=', setFoodData, 'meals');
  useFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', setDrinkData, 'drinks');
  useFetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list', setFoodCategory, 'meals');
  useFetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', setDrinkCategory, 'drinks');

  const context = {
    foodData,
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
  };

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;
