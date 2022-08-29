export default (recipe, type, id) => {
  const DetailsToStore = {
    id,
    type: type === 'meals' ? 'food' : 'drink',
    nationality: recipe.strArea || '',
    category: recipe.strCategory || '',
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strMealThumb || recipe.strDrinkThumb,
    doneDate: new Date().toLocaleDateString(),
    tags: recipe.strTags?.split(',') || [],
  };
  return DetailsToStore;
};
