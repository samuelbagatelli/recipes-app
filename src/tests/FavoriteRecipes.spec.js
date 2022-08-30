import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import mockFavorite from '../utils/mockFavorite';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import RenderForHeaderProvider from './helpers/RenderForHeaderProvider';

jest.mock('clipboard-copy');

describe('Testa o funcionamento do componente FavoriteRecipes', () => {
  it('Verifica o Header', () => {
    RenderForHeaderProvider(<FavoriteRecipes />);
    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-food-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
  });
  it('Verifica se todos os itens salvos no localStorage são exibidos na tela', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavorite));
    RenderForHeaderProvider(<FavoriteRecipes />);
    expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
  });
  it('Verifica o "Share":', () => {
    RenderForHeaderProvider(<FavoriteRecipes />);
    userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
    const response ='Link copied!';
    expect(screen.getByText(response)).toBeInTheDocument();
  });
  it('Verifica os filtros:', () => {
    RenderForHeaderProvider(<FavoriteRecipes />);
    const foodBtn = screen.getByTestId('filter-by-food-btn');
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');
    const allBtn = screen.getByTestId('filter-by-all-btn');
    userEvent.click(foodBtn);
    expect(screen.getByRole('heading', { name: /Corba/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /GG/i })).not.toBeInTheDocument();

    userEvent.click(drinkBtn);
    expect(screen.queryByRole('heading', { name: /Corba/i })).not.toBeInTheDocument();

    userEvent.click(allBtn);
    expect(screen.getByRole('heading', { name: /Corba/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /GG/i })).toBeInTheDocument();
  });
  it('Verifica o redirecionamento:', () => {
    const { history } = RenderForHeaderProvider(<FavoriteRecipes />);
    userEvent.click(screen.getByTestId('0-horizontal-name'));
    expect(history.location.pathname).toBe('/foods/52977')
  });
  it('Verifica se eh possível "Desfavoritar"', () => {
    RenderForHeaderProvider(<FavoriteRecipes />);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toHaveLength(2)
    userEvent.click(screen.getByTestId('0-horizontal-favorite-btn'))
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toHaveLength(1)
  })
})

