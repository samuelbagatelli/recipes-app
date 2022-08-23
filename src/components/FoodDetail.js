import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import useFetch from '../hooks/useFetch';

export default function FoodDetail() {
  const { setRecipeDetails } = useContext(AppContext);
  const history = useHistory();
  const { location: { pathname } } = history;
  const ID = pathname.split('/foods/');
  useFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID[1]}`, setRecipeDetails, 'meals');
  return (
    <div>
      batata frita com fetch component
    </div>
  );
}
