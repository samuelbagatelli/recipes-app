import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import RenderForHeaderProvider from './helpers/RenderForHeaderProvider';

import Header from '../components/Header';

describe('Teste do componente "Header"', () => {
  it('Verifica se todos os elementos estão sendo renderizados', () => {
    RenderForHeaderProvider(<Header />, '/foods');

    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
  });
  it('Verifica o botão de perfil', () => {
    const { history } = RenderForHeaderProvider(<Header />, '/foods');

    userEvent.click(screen.getByTestId('profile-top-btn'));
    expect(history.location.pathname).toEqual('/profile');
  });

  it('Verifica o botão de busca', () => {
    RenderForHeaderProvider(<Header />, '/foods');

    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('search-top-btn'));
    expect(screen.queryByTestId('search-input')).toBeInTheDocument();
  });

  it('Verifica se o botão de busca não é exibido na página Favorite Recipes', () => {
    RenderForHeaderProvider(<Header />, '/favorite-recipes');
    expect(screen.queryByTestId('search-top-btn')).not.toBeInTheDocument();
  });

  it('Verifica se o botão de busca não é exibido na páfina de perfil:', () => {
    RenderForHeaderProvider(<Header />, '/profile');
    expect(screen.queryByTestId('search-top-btn')).not.toBeInTheDocument();
  });

  it('Verifica se o botão de busca não é exibido na página Done Recipes', () => {
    RenderForHeaderProvider(<Header />, '/done-recipes');
    expect(screen.queryByTestId('search-top-btn')).not.toBeInTheDocument();
  });
});
