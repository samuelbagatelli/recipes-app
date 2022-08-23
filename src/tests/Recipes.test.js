import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import renderWithRouter from '../helpers/RenderWithRouter';
import { meals } from '../../cypress/mocks/meals';
import App from '../App';

describe('Test case for recipes pages', () => {
  afterEach(() => jest.clearAllMocks());
  test('render correct elements in drinks route', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const firstDrink = await screen.findByAltText(/foto da receita gg/i);
    const lastDrink = await screen.findByAltText(/foto da receita b-52/i);
    const buttonList = await screen.findAllByRole('button');
    expect(firstDrink).toBeInTheDocument();
    expect(lastDrink).toBeInTheDocument();
    buttonList.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });
  test('render correct elements in foods route', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const firstFood = await screen.findByAltText(/foto da receita corba/i);
    const lastFood = await screen.findByAltText(/foto da receita koshari/i);
    const buttonList = await screen.findAllByRole('button');
    expect(firstFood).toBeInTheDocument();
    expect(lastFood).toBeInTheDocument();
    buttonList.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });
  test('correct endpoint if recipe link is clicked in /foods', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const lastFood = await screen.findByAltText(/foto da receita koshari/i);
    userEvent.click(lastFood);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/foods/53027');
  });
  test('correct endpoint if recipe link is clicked in /drinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const lastDrink = await screen.findByAltText(/foto da receita b-52/i);
    userEvent.click(lastDrink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/drinks/15853');
  });
  test('render correct recepies on filter selection on /drinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const lastDrink = await screen.findByAltText(/foto da receita b-52/i);
    const filter = await screen.findByRole('button', { name: /ordinary drink/i });
    const otherFilter = await screen.findByRole('button', { name: /shake/i });
    expect(lastDrink).toBeInTheDocument();
    userEvent.click(filter);
    await waitFor(() => {
      expect(lastDrink).not.toBeInTheDocument();
    });
    expect(otherFilter).toBeDisabled();
  });
  test('render correct recepies on filter selection on /foods', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const lastFood = await screen.findByAltText(/foto da receita koshari/i);
    const filter = await screen.findByRole('button', { name: /dessert/i });
    const otherFilter = await screen.findByRole('button', { name: /breakfast/i });
    expect(lastFood).toBeInTheDocument();
    userEvent.click(filter);
    await waitFor(() => {
      expect(lastFood).not.toBeInTheDocument();
    });
    expect(otherFilter).toBeDisabled();
  });
  test('API is beeing fetched', async () => {
    const api = () => {
      globalThis.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(meals),
      }));
    };
    api();

    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    await waitFor(() => {
      const lastFood = screen.getByAltText(/foto da receita koshari/i);
      expect(lastFood).toBeInTheDocument();
    });
  });
});
