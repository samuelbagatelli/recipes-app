import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('checks if the Done Card is rendered', () => {
    const { history } = RenderWithRouter(<App />);

    history.push('/done-recipes');

    const teste = screen.getByTestId('0-horizontal-top-text');
    expect(teste).toBeInTheDocument();
  });

  let clipboardData = '';

  const mockClipboard = {
    writeText: jest.fn(
      (data) => { clipboardData = data; },
    ),
    readText: jest.fn(
      () => clipboardData,
    ),
  };
  globalThis.navigator.clipboard = mockClipboard;

  it('checks if the share button works as it should', () => {
    const { history } = RenderWithRouter(<App />);

    jest.spyOn(navigator.clipboard, 'writeText');

    history.push('/done-recipes');

    const shareButton = screen.getAllByRole('button', { name: /share button/i });
    expect(shareButton[0]).toBeInTheDocument();

    userEvent.click(shareButton[0]);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/foods/52771');
  });

  it('test the redirectioning to the detailed food/drink page', () => {
    const { history } = RenderWithRouter(<App />);

    history.push('/done-recipes');

    const foodImg = screen.getByRole('button', { name: /spicy arrabiata penne thumbnail/i });
    expect(foodImg).toBeInTheDocument();

    userEvent.click(foodImg);
    expect(history.location.pathname).toBe('/foods/52771');

    history.push('/done-recipes');

    const drinkImg = screen.getByTestId('1-horizontal-image');
    expect(drinkImg).toBeInTheDocument();

    userEvent.click(drinkImg);
    expect(history.location.pathname).toBe('/drinks/178319');
  });

  it('tests the filter buttons', () => {
    const { history } = RenderWithRouter(<App />);

    history.push('/done-recipes');

    const foodFilter = screen.getByRole('button', { name: /food/i });
    userEvent.click(foodFilter);

    const allFilter = screen.getByRole('button', { name: /all/i });
    userEvent.click(allFilter);

    const drinkFilter = screen.getByRole('button', { name: /drinks/i });
    userEvent.click(drinkFilter);
  });
});
