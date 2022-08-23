import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/Footer';

    describe('Testar o Footer', () => {
      test('renderização dos ícones', () => {
        render(<BrowserRouter><Footer /></BrowserRouter>);

        const drinkIcon = screen.getByRole('link', { name: /drinks icon/i });
        const mealIcon = screen.getByRole('link', { name: /meal icon/i });
        
        expect(drinkIcon).toBeInTheDocument();
        expect(mealIcon).toBeInTheDocument();

      });

      test('rotas dos ícones', () => {
        render(<BrowserRouter><Footer /></BrowserRouter>);

        const drinkIcon = screen.getByRole('link', { name: /drinks icon/i });
        const mealIcon = screen.getByRole('link', { name: /meal icon/i });

        userEvent.click(drinkIcon);
        expect(document.location.pathname).toBe('/drinks')

        userEvent.click(mealIcon);
        expect(document.location.pathname).toBe('/foods')
      });
    })