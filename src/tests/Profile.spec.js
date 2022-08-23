import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/RenderWithRouter';

describe('It tests the Profile page', () => {
  it('should render the page', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/profile');

    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();
  });

  it('by clicking the logout it should clear the localStorage and redirect to Login page', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/profile');

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutBtn);

    expect(history.location.pathname).toBe('/');
    expect(localStorage.length).toBe(0);
  });
});
