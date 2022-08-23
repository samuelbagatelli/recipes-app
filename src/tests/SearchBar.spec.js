import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import RenderForHeaderProvider from './helpers/RenderForHeaderProvider';

describe('Testes do componente "SearchBar"', () => {
  beforeEach(() => { global.fetch = jest.fn().mockResolvedValue({ json: jest.fn().mockResolvedValue({}) }); global.alert = jest.fn(); });

  it('Verifica se todos os elementos estão sendo renderizados', () => {
    RenderForHeaderProvider(<SearchBar />);

    expect(screen.getByText('Ingredient')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('First letter')).toBeInTheDocument();
    expect(screen.getByTestId('exec-search-btn')).toBeInTheDocument();
    const RadioIng = screen.getByTestId('ingredient-search-radio');
    userEvent.click(RadioIng);
    const radioName = screen.getByTestId('name-search-radio');
    expect(radioName.checked).not.toBe(true);
    const RadioFl = screen.getByTestId('first-letter-search-radio');
    expect(RadioFl.checked).not.toBe(true);
    userEvent.click(RadioFl);
    expect(RadioIng.checked).toBe(true);
    expect(radioName.checked).toBe(false);
    userEvent.click(radioName);
    expect(RadioIng.checked).toBe(true);
    expect(RadioFl.checked).toBe(true);
  });

  it('Verifica a chamada a API', async () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Cake';
    RenderForHeaderProvider(<Header />, '/foods');
    userEvent.click(screen.getByTestId('search-top-btn'));
    userEvent.type(screen.getByTestId('search-input'), 'Cake');
    userEvent.click(screen.getByTestId('name-search-radio'));
    userEvent.click(screen.getByTestId('exec-search-btn'));

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
});
