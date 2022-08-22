import React, { useState } from 'react';
import { node } from 'prop-types';
import { Redirect } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';
import getRecipes from '../services/getRecipes';

function HeaderProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [searchFunction, setSearchFunction] = useState('');
  const [Filters, setFilters] = useState('');

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
    checkLength,
    Search,
    DataFilter,
    RequestMeal,
    RequestDrink,
  };

  return (
    <HeaderContext.Provider value={ value }>
      {children}
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: node.isRequired,
};

export default HeaderProvider;
