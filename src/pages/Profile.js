import React from 'react';
import Header from '../components/Header';

function Profile() {
  const emailInput = localStorage.getItem('user');

  return (
    <div>
      <Header />
      <span data-testid="profile-email">{emailInput}</span>
      <button
        data-testid="profile-done-btn"
        type="button"
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
