import React from 'react';
import Header from '../components/Header';
import DoneCard from '../components/DoneCard';

function DoneRecipes() {
  // const doneRecipes = localStorage.getItem('doneRecipes');
  // const referenceData = JSON.parse(doneRecipes);

  const referenceData = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {referenceData.length > 0
        ? referenceData.map((element, index) => (
          <DoneCard
            key={ element.id }
            element={ element }
            index={ index }
          />
        ))
        : <h2>Você ainda não fez nenhuma receita</h2>}
    </div>
  );
}

export default DoneRecipes;
