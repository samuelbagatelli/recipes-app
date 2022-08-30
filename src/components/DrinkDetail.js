import React from 'react';
import { Link } from 'react-router-dom';

export default function DrinkDetail(recepieDetails, foodData, pathname) {
  const {
    strDrink,
    strDrinkThumb,
    strCategory,
    strInstructions,
    strAlcoholic,
  } = recepieDetails;

  const doneRec = JSON.parse(localStorage.getItem('doneRecipes'));
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  console.log(inProgress);
  const newIng = Object.keys(recepieDetails);
  let fistIngredient;
  let firstQuant;
  newIng.forEach((string, index) => {
    if (string === 'strIngredient1') {
      fistIngredient = index;
    } else if (string === 'strMeasure1') {
      firstQuant = index;
    }
  });
  const ingredients = Object.values(recepieDetails);
  const copy = [...ingredients];
  const copy2 = [...ingredients];
  const ingredientQuant = 15;
  const ingredientsArray = copy.splice(fistIngredient, ingredientQuant);
  const quantArray = copy2
    .splice(firstQuant, ingredientQuant);

  const verifyLocalStorageDone = () => doneRec
    .some(({ name }) => strDrink === name);

  const BtnText = () => {
    if (!inProgress) return 'Start Recipe';
    return (
      Object
        .keys(inProgress.cocktails)
        .some((ID) => Number(ID) === Number(pathname.match(/(\d+)/)[0]))
        ? 'Continue Recipe' : 'Start Recipe');
  };

  const renderCaroussel = () => {
    const quantLimit = 6;
    return [...foodData]
      .filter((_recipe, index1) => index1 < quantLimit)
      .map((recipe, index) => (
        <div
          key={ recipe.idMeal }
          data-testid={ `${index}-recomendation-card` }
        >
          <h6
            data-testid={ `${index}-recomendation-title` }
          >
            { recipe.strMeal }
          </h6>
          <img
            src={ recipe.strMealThumb }
            alt={ `foto da receita ${recipe.strMeal}` }
            className="carousselImg"
          />
        </div>
      ));
  };

  const renderDrink = () => (
    <>
      <h4
        data-testid="recipe-title"
        className="teste"
      >
        { strDrink }

      </h4>
      <img
        src={ strDrinkThumb }
        alt={ `Receita de ${strDrink}` }
        data-testid="recipe-photo"
        className="w-50"
      />
      <p
        data-testid="recipe-category"
        className="text"
      >
        { `${strCategory} - ${strAlcoholic}` }

      </p>
      <ul>
        { ingredientsArray.map((ingredient, index) => {
          if (ingredient !== '' && ingredient) {
            return (
              <li
                key={ `${ingredient}-${index}` }
                data-testid={ `${index}-ingredient-name-and-measure` }
                className="text"
              >
                { `${ingredient} - ${quantArray[index]}` }
              </li>
            );
          }
          return null;
        }) }
      </ul>
      <p
        data-testid="instructions"
        className="text"
      >
        {`Instructions: ${strInstructions} `}

      </p>
      <div
        className="caroussel"
      >
        { foodData && renderCaroussel() }
      </div>
    </>
  );

  return (
    <section>
      { foodData && renderDrink() }
      <Link to={ `/drinks/${pathname.match(/(\d+)/)[0]}/in-progress` }>
        <button
          data-testid="start-recipe-btn"
          type="button"
          className="startRecipeButton"
          style={ {
            display: doneRec
              && strDrink && !verifyLocalStorageDone() ? 'block' : 'hidden',
          } }
        >
          { BtnText() }
        </button>
      </Link>
    </section>
  );
}
