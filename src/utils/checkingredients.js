const emptyToNonEmpty = () => {
  if (JSON.parse(localStorage.getItem('inProgressRecipes')) === null) {
    localStorage
      .setItem('inProgressRecipes', JSON.stringify({ cocktails: { }, meals: {} }));
  }
};
export default (id, ingredients, type) => {
  emptyToNonEmpty();
  const checkStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (checkStorage) {
    let toVerify = checkStorage[type][id];
    if (toVerify && toVerify.includes(ingredients)) {
      toVerify = toVerify.filter((ele) => ele !== ingredients);
    } else if (toVerify) {
      toVerify.push(ingredients);
    } else {
      toVerify = [ingredients];
    }
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        ...checkStorage, [type]: { ...checkStorage[type], [id]: toVerify } }),
    );
  }
};
