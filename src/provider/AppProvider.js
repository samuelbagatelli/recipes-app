import React, { useState } from 'react';
import { node } from 'prop-types';
import { Redirect } from 'react-router-dom';
import AppContext from '../context/AppContext';
import getRecipes from '../services/getRecipes';
import useFetch from '../hooks/useFetch';

function AppProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [searchFunction, setSearchFunction] = useState('');
  const [Filters, setFilters] = useState('');
  const [searching, setSearching] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [foodData, setFoodData] = useState(null);
  const [foodFilteredData, setFoodFilteredData] = useState(null);
  const [drinkData, setDrinkData] = useState(null);
  const [drinkFilteredData, setDrinkFilteredData] = useState(null);
  const [foodCategory, setFoodCategory] = useState(null);
  const [drinkCategory, setDrinkCategory] = useState(null);
  const [filterActive, setFilterActive] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [mealInprogress, setmealInprogress] = useState([]);
  const [drinkInprogress, setdrinkInprogress] = useState([]);
  const [ingredients, setingredients] = useState([]);
  const [recipeInProgress, setrecipeInProgress] = useState([]);

  useFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=', setFoodData, 'meals');
  useFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', setDrinkData, 'drinks');
  useFetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list', setFoodCategory, 'meals');
  useFetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', setDrinkCategory, 'drinks');

  const Alert = 'Sorry, we haven\'t found any recipes for these filters.';

  const manageRequest = (type) => {
    if (searchFunction.length > 1 && Filters === 'first-letter') {
      return global.alert('Your search must have only 1 (one) character');
    }

    if (type === 'meals') {
      getRecipes(searchFunction, Filters, type)
        .then((data) => {
          if (data[type]?.length === 0 || data[type] === null) {
            global.alert(Alert);
          }
          return setMeals(data[type] || []);
        });
    }

    if (type !== 'meals') {
      getRecipes(searchFunction, Filters, type)
        .then((data) => {
          if (data[type]?.length === 0 || data[type] === null) {
            global.alert(Alert);
          }
          return setDrinks(data[type] || []);
        });
    }
  };

  const checkLength = () => {
    if (meals.length === 1) return <Redirect to={ `/foods/${meals[0].idMeal}` } />;
  };

  const RequestMeal = () => manageRequest('meals');
  const RequestDrink = () => manageRequest('drinks');

  const Search = (value) => setSearchFunction(value);
  const DataFilter = (value) => setFilters(value);

  const value = {
    meals,
    drinks,
    searchFunction,
    searching,
    checkLength,
    Search,
    DataFilter,
    RequestMeal,
    RequestDrink,
    setSearching,
    emailInput,
    setEmailInput,
    passwordInput,
    setPasswordInput,
    foodData,
    setFoodData,
    drinkData,
    setDrinkData,
    foodCategory,
    setFoodCategory,
    drinkCategory,
    setDrinkCategory,
    filterActive,
    setFilterActive,
    foodFilteredData,
    setFoodFilteredData,
    drinkFilteredData,
    setDrinkFilteredData,
    filterValue,
    setFilterValue,
    loading,
    setLoading,
    mealInprogress,
    setmealInprogress,
    drinkInprogress,
    setdrinkInprogress,
    ingredients,
    setingredients,
    recipeInProgress,
    setrecipeInProgress,
  };

  return (
    <AppContext.Provider value={ value }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: node.isRequired,
};

export default AppProvider;
