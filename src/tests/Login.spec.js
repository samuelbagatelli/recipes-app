import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RenderWithRouter from '../helpers/RenderWithRouter';

describe('Tests the Login page', () => {
  it('Should render the page', () => {
    RenderWithRouter(
      <App />,
    );

    const header = screen.getByRole('heading', { name: /login/i });

    expect(header).toBeInTheDocument();
  });

  it('The form should work properly', () => {
    const { history } = RenderWithRouter(
      <App />,
    );

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, 'teste@teste.com');
    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, 'senha123');

    const button = screen.getByTestId('login-submit-btn');
    userEvent.click(button);

    expect(history.location.pathname).toBe('/foods');
  });

  it('Should call the handleSubmit function', () => {
    RenderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, 'email@teste.com');
    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, 'senha1');

    const teste = localStorage.getItem('user');
    expect(teste).toBe('{ "email": "teste@teste.com" }');
  });
});
