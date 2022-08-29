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
  const MEALS_OR_COCKTAILS = type === 'foods' ? 'meals' : 'cocktails';
  const ToFavorite = location.pathname.match(/foods\//i) ? 'food' : 'drink';

  const [ingredientDone, setingredientDone] = useState([]);
  const [shared, setshared] = useState(false);
  const [favorite, setfavorite] = useState(false);

  const checkIfStored = () => {
    const InStore = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const stored = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (InStore) setingredientDone(InStore[MEALS_OR_COCKTAILS][getID[0]] || []);
    if (stored) setfavorite(stored.some((ele) => (ele.id === getID[0])));
  };

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
    checkIfStored();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setFavorite = () => {
    setfavorite(!favorite);
    favoriteRecipe(recipe, ToFavorite, getID[0]);
  };

  const endProcess = () => {
    const setData = DetailsTostore(recipe, type, getID[0]);
    const PROCESS_ENDED = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    localStorage.setItem('doneRecipes', JSON.stringify([...PROCESS_ENDED, setData]));
    history.push('/done-recipes');
  };

  return (
    <div>
      <h1 data-testid="recipe-title">
        { recipe.strMeal || recipe.strDrink }
      </h1>
      <img
        style={ {
          height: 200,
          width: 350,
        } }
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
        { favorite ? <img src={ YEPFavorited } alt="Black Heart" />
          : <img src={ NONFavorite } alt="White Heart" /> }
      </button>
      <h3 data-testid="recipe-category">
        {recipe.strCategory}
      </h3>
      <ul style={ { listStyleType: 'none' } }>
        { ingredients.map((ele, ii) => (
          <li
            key={ ii }
            data-testid={ `${ii}-ingredient-step` }
          >
            <input
              id={ ele }
              type="checkbox"
              onChange={ () => {
                checkingredients(getID[0], ele, MEALS_OR_COCKTAILS);
                checkIfStored();
              } }
              checked={ ingredientDone.includes(ele) }
            />
            { ele }
          </li>
        )) }
      </ul>
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
