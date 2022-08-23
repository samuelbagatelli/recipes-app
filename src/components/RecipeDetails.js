import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import DrinkDetail from './DrinkDetail';
import FoodDetail from './FoodDetail';

export default function RecipeDetails() {
  // const { recipeDetails } = useContext(AppContext);
  const history = useHistory();
  const { location: { pathname } } = history;

  return (
    <div>
      { pathname.includes('/foods/') && FoodDetail() }
      { pathname.includes('/drinks/') && DrinkDetail() }
    </div>
  );
}
