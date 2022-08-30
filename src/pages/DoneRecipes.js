import React, { useContext } from 'react';
import Header from '../components/Header';
import DoneCard from '../components/DoneCard';
import AppContext from '../context/AppContext';

function DoneRecipes() {
  const doneRecipes = localStorage.getItem('doneRecipes');
  const referenceData = JSON.parse(doneRecipes);

  const {
    doneRecipesFiltered,
    setDoneRecipesFiltered,
  } = useContext(AppContext);

  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setDoneRecipesFiltered(referenceData) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => {
          const justFoods = referenceData.filter((elem) => elem.type === 'food');
          setDoneRecipesFiltered(justFoods);
        } }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => {
          const justDrinks = referenceData.filter((elem) => elem.type === 'drink');
          setDoneRecipesFiltered(justDrinks);
        } }
      >
        Drinks
      </button>
      {doneRecipesFiltered.map((element, index) => (
        <DoneCard
          key={ element.id }
          element={ element }
          index={ index }
        />
      )) }
    </div>
  );
}

export default DoneRecipes;
