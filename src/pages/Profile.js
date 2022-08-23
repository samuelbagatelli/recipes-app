import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();

  const emailInput = localStorage.getItem('user');

  const clearLocalStorage = () => {
    localStorage.clear();

    history.push('/');
  };

  return (
    <div>
      <Header />
      <span data-testid="profile-email">{emailInput}</span>
      <Link to="/done-recipes">
        <button
          data-testid="profile-done-btn"
          type="button"
        >
          Done Recipes
        </button>
      </Link>
      <Link to="/favorite-recipes">
        <button
          data-testid="profile-favorite-btn"
          type="button"
        >
          Favorite Recipes
        </button>
      </Link>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ clearLocalStorage }
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
