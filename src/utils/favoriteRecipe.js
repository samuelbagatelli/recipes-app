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
  const storedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  if (storedRecipes) {
    const storedFile = storedRecipes
      ?.some((stored) => stored.id === id);
    if (storedFile) {
      return localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...storedRecipes.filter((ele) => (ele.id !== id))]),
      );
    }
    return localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([...storedRecipes, structureRecipe]),
    );
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify([structureRecipe]));
};
