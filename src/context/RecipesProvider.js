import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [foodData, setFoodData] = useState(null);
  const [drinkData, setDrinkData] = useState(null);
  const [foodCategory, setFoodCategory] = useState(null);
  const [drinkCategory, setDrinkCategory] = useState(null);

  useEffect(() => {
    const foodApiRequest = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setFoodData(data.meals);
      } catch (error) {
        console.log(error);
      }
    };
    const drinkApiRequest = async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setDrinkData(data.drinks);
      } catch (error) {
        console.log(error);
      }
    };
    const foodCategoryRequest = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        setFoodCategory(data.meals);
      } catch (error) {
        console.log(error);
      }
    };
    const drinkCategoryRequest = async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        setDrinkCategory(data.drinks);
      } catch (error) {
        console.log(error);
      }
    };
    foodApiRequest();
    drinkApiRequest();
    foodCategoryRequest();
    drinkCategoryRequest();
  }, []);

  const context = {
    foodData,
    drinkData,
    foodCategory,
    drinkCategory,
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
