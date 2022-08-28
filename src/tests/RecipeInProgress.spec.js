import React from 'react';
import userEvent from '@testing-library/user-event';
import { waitFor, screen } from '@testing-library/react';
import mockDrinks from '../utils/mockDrinks';
import mockMeals from '../utils/mockMeals';
import RecipeInProgress from '../pages/RecipeInProgress';
import RenderForHeaderProvider from './helpers/RenderForHeaderProvider';

jest.mock('clipboard-copy');
describe('Testa componente RecipeInProgress', () => {
  beforeEach(() => { global.fetch = jest.fn().mockResolvedValue({json: jest.fn().mockResolvedValue(mockMeals), });
    localStorage.clear();});
  it('Verifica se todos os elementos estão sendo renderizados (foods)', async() => {
    RenderForHeaderProvider(<RecipeInProgress />, '/foods/52977/in-progress');
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const finishBTN = screen.getByTestId('finish-recipe-btn');
    const favoriteBTN = screen.getByTestId('favorite-btn');


    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(favoriteBTN).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(finishBTN).toBeInTheDocument();
    
    userEvent.click(screen.getByTestId('share-btn'));
    expect(screen.getByText('Link copied!')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('favorite-btn')); 
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toHaveLength(1);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))[0].type).toBe('food'); 

  });
  
  it('Verifica se todos os elementos estão sendo renderizados (drinks) e a finalização do processo.', async() => {
    global.fetch = jest
    .fn()
    .mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockDrinks),
    })
    .mockResolvedValue({ json: jest.fn().mockResolvedValue(mockDrinks) });
    const { history } = RenderForHeaderProvider(<RecipeInProgress />, '/drinks/15997/in-progress');
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const finishBTN = screen.getByTestId('finish-recipe-btn');
    const favoriteBTN = screen.getByTestId('favorite-btn');
    const CHECKBOXES = screen.getAllByRole('checkbox');


    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(favoriteBTN).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(finishBTN).toBeInTheDocument();
    
    userEvent.click(screen.getByTestId('share-btn'));
    expect(screen.getByText('Link copied!')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('favorite-btn')); 
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toHaveLength(1);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))[0].type).toBe('drink');

    CHECKBOXES.forEach((ele) => userEvent.click(ele));
    userEvent.click(finishBTN);

    expect(history.location.pathname).toBe('/done-recipes');

  });
});
