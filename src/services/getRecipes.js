export default async (value = '', filter = 'name', type = 'meals') => {
  let GET_FOOD = type === 'meals' ? 'https://www.themealdb.com/api/json/v1/1/' : 'https://www.thecocktaildb.com/api/json/v1/1/';
  switch (filter) {
  case 'ingredient': GET_FOOD += `filter.php?i=${value}`; break;
  case 'first-letter': GET_FOOD += `search.php?f=${value}`; break;
  default: GET_FOOD += `search.php?s=${value}`; break;
  } try {
    const response = await fetch(GET_FOOD); return await response.json();
  } catch { return {}; }
};
