import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/RenderWithRouter';


describe('Test case for recipes pages', () => {
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
      })
  });
  test('render correct elements in drinks route', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const firstFood = await screen.findByAltText(/foto da receita corba/i);
    const lastFood = await screen.findByAltText(/foto da receita koshari/i);
    const buttonList = await screen.findAllByRole('button');
      expect(firstFood).toBeInTheDocument();
      expect(lastFood).toBeInTheDocument();
      buttonList.forEach((button) => {
        expect(button).toBeInTheDocument();
      })
  });
});