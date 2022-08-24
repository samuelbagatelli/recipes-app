import React, { useState } from 'react';
import { node } from 'prop-types';
import { Redirect } from 'react-router-dom';
import AppContext from '../context/AppContext';
import getRecipes from '../services/getRecipes';
import useFetch from '../hooks/useFetch';

function AppProvider({ children }) {
  const referenceData = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

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
  const [copied, setCopied] = useState(false);
  const [doneRecipesFiltered, setDoneRecipesFiltered] = useState(referenceData);

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
    copied,
    setCopied,
    doneRecipesFiltered,
    setDoneRecipesFiltered,
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
