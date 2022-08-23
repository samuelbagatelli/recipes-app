import React from 'react';

export default function FoodDetail(recepieDetails) {
  const {
    strMeal,
    strMealThumb,
    strCategory,
    strInstructions,
    strYoutube,
    strSource,
  } = recepieDetails;

  const ingredients = Object.values(recepieDetails);
  const copy = [...ingredients];
  const copy2 = [...ingredients];
  const lastNonIngredient = 9;
  const ingredientQuant = 20;
  const ingredientsArray = copy.splice(lastNonIngredient, ingredientQuant);
  const quantArray = copy2.splice(lastNonIngredient + ingredientQuant, ingredientQuant);
  const youtubeRef = strYoutube.split('=')[1];

  const renderMeal = () => (
    <>
      <h2
        data-testid="recipe-title"
        className="teste"
      >
        { strMeal }

      </h2>
      <img
        src={ strMealThumb }
        alt={ `Receita de ${strMeal}` }
        data-testid="recipe-photo"
        className="w-50"
      />
      <p data-testid="recipe-category">{ strCategory }</p>
      <ul>
        { ingredientsArray.map((ingredient, index) => {
          if (ingredient !== '') {
            return (
              <li
                key={ `${ingredient}-${index}` }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { `${ingredient} - ${quantArray[index]}` }
              </li>
            );
          }
          return null;
        }) }
      </ul>
      <p data-testid="instructions">{`Instructions: ${strInstructions} `}</p>
      <iframe
        data-testid="video"
        src={ `https://www.youtube.com/embed/${youtubeRef}` }
        frameBorder="0"
        allow="autoplay; encrypted-media;"
        allowFullScreen
        title="video"
      />
      <a
        href={ strSource }
        target="_blank"
        rel="noreferrer"
      >
        { `Link to ${strMeal} recipe` }

      </a>
    </>
  );

  return (
    <section>
      { renderMeal() }
    </section>
  );
}
