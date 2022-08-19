import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Tests the Login page', () => {
  afterEach(cleanup);
  it('Should render the page', () => {
    renderWithRouter(
      <App />,
    );

    const header = screen.getByRole('heading', { name: /login/i });

    expect(header).toBeInTheDocument();
  });

  it('The form should work properly', () => {
    const { history } = renderWithRouter(
      <App />,
    );

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, 'teste@teste.com');
    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, 'senha1');

    const button = screen.getByTestId('login-submit-btn');
    userEvent.click(button);

    expect(history.location.pathname).toBe('/');
  });
});
