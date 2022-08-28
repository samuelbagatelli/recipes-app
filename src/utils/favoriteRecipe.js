export default (recipe, type) => {
  const id = recipe.idMeal || recipe.idDrink;
  const structureRecipe = {
    id,
    type,
    nationality: recipe.strArea || '',
    category: recipe.strCategory || '',
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strMealThumb || recipe.strDrinkThumb,
  };
  if (JSON.parse(localStorage.getItem('favoriteRecipes'))) {
    const storedFile = JSON.parse(localStorage
      .getItem('favoriteRecipes'))?.some((stored) => stored.id === id);
    if (storedFile) {
      return localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...JSON.parse(localStorage.getItem('favoriteRecipes'))
          .filter((ele) => (ele.id !== id))]),
      );
    } return localStorage.setItem('favoriteRecipes',
      JSON.stringify([...JSON.parse(localStorage
        .getItem('favoriteRecipes')), structureRecipe]));
  } localStorage.setItem('favoriteRecipes', JSON.stringify([structureRecipe]));
};
