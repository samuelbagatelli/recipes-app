import React from 'react';

export default function FoodDetail(recepieDetails, drinkData) {
  const {
    strMeal,
    strMealThumb,
    strCategory,
    strInstructions,
    strYoutube,
  } = recepieDetails;

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
      { renderMeal() }
      <button
        data-testid="start-recipe-btn"
        type="button"
        className="startRecipeButton"
      >
        Teste
      </button>
    </section>
  );
}
