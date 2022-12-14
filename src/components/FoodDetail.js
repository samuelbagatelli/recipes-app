import React from 'react';
// import { Link } from 'react-router-dom';

export default function FoodDetail(recepieDetails, drinkData) {
  const {
    strMeal,
    strMealThumb,
    strCategory,
    strInstructions,
    strYoutube,
    // idMeal,
  } = recepieDetails;

  // const doneRec = JSON.parse(localStorage.getItem('doneRecipes'));
  // const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
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
  const ingredientQuant = 20;
  const ingredientsArray = copy.splice(fistIngredient, ingredientQuant);
  const quantArray = copy2.splice(firstQuant, ingredientQuant);
  const youtubeRef = strYoutube.split('=')[1];

  // const verifyLocalStorageDone = () => {
  //   const teste = doneRec
  //     .some(({ id }) => Number(idMeal) === Number(id));
  //   return teste;
  // };

  // const BtnText = () => {
  //   if (!inProgress) return 'Start Recipe';
  //   return (
  //     Object
  //       .keys(inProgress.meals)
  //       .some((ID) => Number(ID) === Number(pathname.match(/(\d+)/)[0]))
  //       ? 'Continue Recipe' : 'Start Recipe');
  // };

  // Desenvolvido com o auxílio do Bryan da 22-B
  const renderCaroussel = () => {
    const quantLimit = 6;
    return [...drinkData]
      .filter((_recipe, index1) => index1 < quantLimit)
      .map((recipe, index) => (
        <div
          key={ recipe.idDrink }
          data-testid={ `${index}-recomendation-card` }
        >
          <h6
            data-testid={ `${index}-recomendation-title` }
          >
            { recipe.strDrink }

          </h6>
          <img
            src={ recipe.strDrinkThumb }
            alt={ `foto da receita ${recipe.strDrink}` }
            className="carousselImg"
          />
        </div>
      ));
  };

  const renderMeal = () => (
    <>
      <h4
        data-testid="recipe-title"
        className="teste"
      >
        { strMeal }

      </h4>
      <img
        src={ strMealThumb }
        alt={ `Receita de ${strMeal}` }
        data-testid="recipe-photo"
        className="w-50"
      />
      <p
        data-testid="recipe-category"
        className="text"
      >
        { strCategory }

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
      <iframe
        data-testid="video"
        src={ `https://www.youtube.com/embed/${youtubeRef}` }
        frameBorder="0"
        allow="autoplay; encrypted-media;"
        allowFullScreen
        title="video"
      />
      <div className="caroussel">
        { drinkData && renderCaroussel() }
      </div>
    </>
  );

  return (
    <section>
      { drinkData && renderMeal() }
      {/* { doneRec && strMeal && !verifyLocalStorageDone()
      && (
        <Link to={ `/foods/${pathname.match(/(\d+)/)[0]}/in-progress` }>
          <button
            data-testid="start-recipe-btn"
            type="button"
            className="startRecipeButton"
            style={ {
              bottom: 0,
              position: 'fixed',
            } }
          >
            { BtnText() }
          </button>
        </Link>)} */}
    </section>
  );

  // return (
  //   <section>
  //     { console.log(strMeal)}
  //     { drinkData && renderMeal() }
  //     <Link to={ `/foods/${pathname.match(/(\d+)/)[0]}/in-progress` }>
  //       <button
  //         data-testid="start-recipe-btn"
  //         type="button"
  //         className="startRecipeButton"
  //         style={ {
  //           display: doneRec && strMeal && !verifyLocalStorageDone() ? 'block' : 'none',
  //         } }
  //       >
  //         { BtnText() }
  //       </button>
  //     </Link>

  //   </section>
  // );
}
