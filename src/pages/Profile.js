import React, { useContext } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function Profile() {
  const {
    emailInput,
  } = useContext(AppContext);

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
