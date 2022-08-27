import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import RenderForHeaderProvider from './helpers/RenderForHeaderProvider';

import RecipeInProgress from '../pages/RecipeInProgress';

describe('Teste da página "Recipe in Progress"', () => {
  it('Verifica se todos os elementos estão sendo renderizados', () => {
    RenderForHeaderProvider(<RecipeInProgress />, '/foods/52977/in-progress');

    const finishBTN = screen.getByTestId('finish-recipe-btn');

    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(finishBTN).toBeInTheDocument();

  });

});
