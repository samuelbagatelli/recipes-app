import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';

import AppContext from '../context/AppContext';
import DrinkDetail from './DrinkDetail';
import FoodDetail from './FoodDetail';

export default function RecipeDetails() {
  const { drinkData, foodData } = useContext(AppContext);
  const [recepieDetails, setRecipeDetails] = useState(null);
  const [shared, setShared] = useState(false);
  const history = useHistory();
  const { location: { pathname } } = history;
  const mealEndpoint = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const drinksEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  useEffect(() => {
    const asyncFetch = async () => {
      const pathRef = pathname.includes('/foods/') ? '/foods/' : '/drinks/';
      const endpoint = pathRef === '/foods/' ? mealEndpoint : drinksEndpoint;
      const key = pathRef === '/foods/' ? 'meals' : 'drinks';
      const ID = pathname.split(pathRef)[1];
      try {
        const response = await fetch(`${endpoint}${ID}`);
        const data = await response.json();
        setRecipeDetails(data[key][0]);
        return [data];
      } catch (error) {
        return error;
      }
    };
    asyncFetch();
  }, []);

  return (
    <div className="alt-100">
      <button
        onClick={ () => {
          copy(window.location.href);
          setShared(true);
        } }
        type="button"
        data-testid="share-btn"
      >
        Share
      </button>
      { shared && <p>Link copied!</p> }
      <button
        // onClick={ setFavorite }
        type="button"
        data-testid="favorite-btn"
        // src={ favorite ? YEPFavorited : NONFavorite }
      >
        {/* { favorite ? <img src={ YEPFavorited } alt="Black Heart" />
          : <img src={ NONFavorite } alt="White Heart" /> } */}
        favorito
      </button>
      { pathname
        .includes('/foods/')
        && recepieDetails
        ? FoodDetail(recepieDetails, drinkData, pathname) : null }
      { pathname
        .includes('/drinks/')
        && recepieDetails
        ? DrinkDetail(recepieDetails, foodData, pathname) : null }
    </div>
  );
}
