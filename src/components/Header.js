import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import AppContext from '../context/AppContext';
import SearchBar from './SearchBar';

function Header() {
  const routeGroup = {
    '/foods': 'Foods',
    '/drinks': 'Drinks',
    '/done-recipes': 'Done Recipes',
    '/favorite-recipes': 'Favorite Recipes',
    '/profile': 'Profile',
  };

  const [manageVisibility, setmanageVisibility] = useState(false);
  const history = useHistory();
  const { location: { pathname } } = history;

  const { searchFunction, Search } = useContext(AppContext);

  const pageToShowSearch = ['/foods', '/drinks'];

  return (
    <header>
      <h1 data-testid="page-title">{routeGroup[pathname]}</h1>

      <button onClick={ () => history.push('/profile') } type="button">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="profile icon" />
      </button>
      { pageToShowSearch.includes(pathname)
        && (
          <button
            onClick={ () => setmanageVisibility(!manageVisibility) }
            type="button"
            data-testid="button-showAndHide"
          >
            <img
              alt="search icon"
              data-testid="search-top-btn"
              src={ searchIcon }
            />
          </button>
        ) }
      { manageVisibility && (
        <input
          data-testid="search-input"
          onChange={ ({ target: { value } }) => Search(value) }
          placeholder="Search recipe"
          value={ searchFunction }
        />
      ) }
      <SearchBar />
    </header>
  );
}

export default Header;
