import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';

import AppContext from '../context/AppContext';
import favoriteRecipe from '../utils/favoriteRecipe';
import DrinkDetail from './DrinkDetail';
import FoodDetail from './FoodDetail';
import NONFavorite from '../images/whiteHeartIcon.svg';
import YEPFavorited from '../images/blackHeartIcon.svg';

export default function RecipeDetails() {
  const { drinkData, foodData } = useContext(AppContext);
  const [recepieDetails, setRecipeDetails] = useState(null);
  const [shared, setShared] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [favoriteLS, setfavoriteLS] = useState(false);
  const [andamento, setAndamento] = useState(undefined);
  const history = useHistory();
  const { location: { pathname } } = history;
  const mealEndpoint = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const drinksEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  const ToFavorite = pathname.match(/foods\//i) ? 'food' : 'drink';
  const pathRef = pathname.includes('/foods/') ? '/foods/' : '/drinks/';
  const endpoint = pathRef === '/foods/' ? mealEndpoint : drinksEndpoint;
  const key = pathRef === '/foods/' ? 'meals' : 'drinks';
  const ID = pathname.split(pathRef)[1];
  // const MEALS_OR_COCKTAILS = pathname.match(/foods\//i) ? 'meals' : 'cocktails';
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  // const doneRec = JSON.parse(localStorage.getItem('doneRecipes'));

  const checkIfStored = () => {
    // const InStore = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const stored = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // if (InStore) setInProgress(InStore[MEALS_OR_COCKTAILS][ID] || []);
    if (stored) setfavoriteLS(stored.some((ele) => (ele.id === ID)));
  };

  useEffect(() => {
    const asyncFetch = async () => {
      try {
        const response = await fetch(`${endpoint}${ID}`);
        const data = await response.json();
        setRecipeDetails(data[key][0]);
        return [data];
      } catch (error) {
        return error;
      }
    };
    console.log(favoriteLS);
    asyncFetch();
    checkIfStored();
    setAndamento(inProgress?.meals[ID] || inProgress?.cocktails[ID]);
  }, []);

  const setFavoriteFunc = () => {
    setFavorite(!favorite);
    favoriteRecipe(recepieDetails, ToFavorite, ID);
  };

  // const BtnText = () => {
  //   const inProgress2 = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   const bool = Object
  //     .keys(inProgress2[MEALS_OR_COCKTAILS])
  //     .some((recipeID) => recipeID === ID);
  //   return bool ? 'Continue Recipe' : 'Start Recipe';
  // };

  // const BtnText = () => (andamento ? 'Continue Recipe' : 'Start Recipe');

  // const BtnText = () => (
  //   Object
  //     .keys(inProgress[MEALS_OR_COCKTAILS])
  //     .some((recipeID) => Number(
  //       key === 'meals' ? foodData.idMeal : drinkData.idDrink,
  //     ) === Number(recipeID))
  //     ? 'Continue Recipe' : 'Start Recipe');

  return (
    <div>
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
        onClick={ setFavoriteFunc }
        type="button"
        data-testid="favorite-btn"
        src={ favorite ? YEPFavorited : NONFavorite }
      >
        { favorite ? <img src={ YEPFavorited } alt="Black Heart" />
          : <img src={ NONFavorite } alt="White Heart" /> }
      </button>
      { pathname
        .includes('/foods/')
        && recepieDetails
        ? FoodDetail(recepieDetails, drinkData, pathname) : null }
      { pathname
        .includes('/drinks/')
        && recepieDetails
        ? DrinkDetail(recepieDetails, foodData, pathname) : null }
      <button
        data-testid="start-recipe-btn"
        type="button"
        className="startRecipeButton"
        onClick={ () => (pathRef
          && pathname
          && history.push(`${pathRef}${ID}/in-progress`)) }
        style={ {
          bottom: 0,
          position: 'fixed',
        } }
      >
        { andamento ? 'Continue Recipe' : 'Start Recipe' }
      </button>
    </div>
  );
}
