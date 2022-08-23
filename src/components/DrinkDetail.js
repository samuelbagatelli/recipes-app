import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import useFetch from '../hooks/useFetch';

export default function DrinkDetail() {
  const { setRecipeDetails } = useContext(AppContext);
  const history = useHistory();
  const { location: { pathname } } = history;
  const ID = pathname.split('/drinks/');
  useFetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ID[1]}`, setRecipeDetails, 'drinks');
  return (
    <div>
      milk shake com fetch component
    </div>
  );
}
