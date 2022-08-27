import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import fetchInprogress from '../services/fetchInprogress';
import checkingredients from '../utils/checkingredients';
import favoriteRecipe from '../utils/favoriteRecipe';
import DetailsTostore from '../utils/DetailsTostore';
import NONFavorite from '../images/whiteHeartIcon.svg';
import YEPFavorited from '../images/blackHeartIcon.svg';

function RecipeInProgress() {
  const location = useLocation();
  const history = useHistory();
  const getID = location.pathname.split('/').splice(2);
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const type = location.pathname.match(/foods\//i) ? 'meals' : 'drinks';
  const [ingredientDone, setingredientDone] = useState([]);
  const theType = type === 'foods' ? 'meals' : 'cocktails';
  const ToFavorite = location.pathname.match(/foods\//i) ? 'food' : 'drink';
  const checkIfStored = () => {
    const checkIfInStore = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (checkIfInStore) setingredientDone(checkIfInStore[theType][getID[0]] || []);
  };
  const [shared, setshared] = useState(false);
  const [favorite, setfavorite] = useState(false);

  useEffect(() => {
    checkIfStored();
    const stored = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (stored) {
      setfavorite(stored.some((ele) => (ele.id === getID[0])));
    }
  }, []);

  useEffect(() => {
    fetchInprogress(getID[0], type)
      .then((data) => {
        const fetchedData = data[type][0];
        const Keys = Object.keys(fetchedData)
          .filter((k) => k.match(/strIngredient/i) && fetchedData[k]);
        const mKeys = Object.keys(fetchedData)
          .filter((k) => k.match(/strMeasure/i) && fetchedData[k]);
        setRecipe(fetchedData);
        setIngredients(Keys.map((k, i) => (
          `${fetchedData[k]} ${fetchedData[mKeys[i]] || ''}`
        )));
      });
  }, []);

  const setFavorite = () => {
    favoriteRecipe(recipe, ToFavorite);
    setfavorite(!favorite);
  };

  const endProcess = () => {
    const id = getID[0];
    const PROCESS_ENDED = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const setData = DetailsTostore(recipe, type, id);
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify([...PROCESS_ENDED, setData]),
    );
    history.push('/done-recipes');
  };

  return (
    <div>
      <h1 data-testid="recipe-title">
        { recipe.strMeal || recipe.strDrink }
      </h1>
      <img
        data-testid="recipe-photo"
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
      />
      <button
        onClick={ () => {
          copy(window.location.href.replace('/in-progress', ''));
          setshared(true);
        } }
        type="button"
        data-testid="share-btn"
      >
        Share
      </button>
      { shared && <p>Link copied!</p> }
      <button
        onClick={ setFavorite }
        type="button"
        data-testid="favorite-btn"
        src={ favorite ? YEPFavorited : NONFavorite }
      >
        { favorite
          ? <img src={ YEPFavorited } alt="Black Heart" />
          : <img src={ NONFavorite } alt="White Heart" /> }
      </button>
      <p data-testid="recipe-category">
        {recipe.strCategory}
      </p>
      <div>
        { ingredients.map((ingredient, index) => (
          <label
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            htmlFor={ ingredient }
          >
            <input
              id={ ingredient }
              type="checkbox"
              onChange={ () => {
                checkingredients(getID[0], ingredient, theType);
                checkIfStored();
              } }
              checked={ ingredientDone.includes(ingredient) }
            />
            { ingredient }
          </label>
        )) }
      </div>
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <button
        disabled={ ingredients.length !== ingredientDone.length }
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ () => endProcess() }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default RecipeInProgress;
