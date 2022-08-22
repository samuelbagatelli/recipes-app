import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';

function SearchBar() {
  const { DataFilter, RequestMeal, RequestDrink } = useContext(HeaderContext);
  const { location: { pathname } } = useHistory();
  const MANAGE_REQUEST = pathname === '/foods' ? RequestMeal : RequestDrink;

  return (
    <fieldset>
      <form>
        <label htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            id="ingredient"
            onChange={ ({ target: { value } }) => DataFilter(value) }
            type="radio"
            value="ingredient"
          />
          Ingredient
        </label>

        <label htmlFor="name">
          <input
            data-testid="name-search-radio"
            id="name"
            onChange={ ({ target: { value } }) => DataFilter(value) }
            type="radio"
            value="name"
          />
          Name
        </label>

        <label htmlFor="first-letter">
          <input
            data-testid="first-letter-search-radio"
            id="first-letter"
            onChange={ ({ target: { value } }) => DataFilter(value) }
            type="radio"
            value="first-letter"
          />
          First letter
        </label>

        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ MANAGE_REQUEST }
        >
          Search
        </button>
      </form>
    </fieldset>
  );
}

export default SearchBar;
