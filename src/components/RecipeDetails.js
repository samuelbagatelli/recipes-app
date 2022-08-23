import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DrinkDetail from './DrinkDetail';
import FoodDetail from './FoodDetail';

export default function RecipeDetails() {
  const [recepieDetails, setRecipeDetails] = useState(null);
  const history = useHistory();
  const { location: { pathname } } = history;
  useEffect(() => {
    const asyncFetch = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${pathname.split('/foods/')[1]}`);
        const data = await response.json();
        setRecipeDetails(data.meals[0]);
        return [data];
      } catch (error) {
        return error;
      }
    };
    asyncFetch();
  }, []);

  return (
    <div className="alt-100">
      { pathname.includes('/foods/') && recepieDetails ? FoodDetail(recepieDetails) : null }
      { pathname.includes('/drinks/') && recepieDetails ? DrinkDetail(recepieDetails) : null }
    </div>
  );
}
