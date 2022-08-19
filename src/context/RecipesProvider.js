import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [foodData, setFoodData] = useState(null);
  const [drinkData, setDrinkData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foodApiRequest = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setFoodData(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    const drinkApiRequest = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setDrinkData(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    foodApiRequest();
    drinkApiRequest();
  }, []);

  const context = {
    foodData,
    drinkData,
    loading,
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
