import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from '../helpers/RenderWithRouter';

describe('It tests the DoneRecipes page', () => {
  beforeEach(() => {
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
    localStorage.setItem('doneRecipes', JSON.stringify(referenceData));
  });
  afterEach(cleanup);
  it('Tests the DoneCard component', () => {
    const { history } = RenderWithRouter(<App />);

    history.push('/done-recipes');

    const teste = screen.getByTestId('0-horizontal-top-text');
    expect(teste).toBeInTheDocument();
  });
});
