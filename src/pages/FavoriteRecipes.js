import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import YEPFavorited from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [select, setselect] = useState('');
  const [list, setlist] = useState([]);
  const [shared, setshared] = useState(false);
  useEffect(() => {
    const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteStorage) {
      setlist(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  }, []);

  const setFavorite = (id) => {
    const EXCEPT_SELECTED = list.filter((ele) => ele.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify([...EXCEPT_SELECTED]));
    setlist(EXCEPT_SELECTED);
  };

  const history = useHistory();
  const routeChange = (recipe) => {
    const path = `/${recipe.type}s/${recipe.id}`;
    history.push(path);
  };

  const shareLink = (ele) => {
    copy(`${window.location.href
      .replace('favorite-recipes', '')}${ele.type}s/${ele.id}`);
    setshared(true);
  };

  return (
    <div>
      <Header />
      <button
        style={ { color: 'red', fontStyle: 'italic', borderRadius: '5px' } }
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setselect('') }
      >
        All
      </button>
      <button
        style={ { color: 'red', fontStyle: 'italic', borderRadius: '5px' } }
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setselect('food') }
      >
        Food
      </button>
      <button
        type="button"
        style={ { color: 'red', fontStyle: 'italic', borderRadius: '5px' } }
        data-testid="filter-by-drink-btn"
        onClick={ () => setselect('drink') }
      >
        Drink
      </button>
      {list
        .filter((ele) => ele.type.includes(select)).map((ele, index) => (
          <div key={ ele.id }>
            <button
              style={ { color: 'red', fontStyle: 'italic', borderRadius: '5px' } }
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => shareLink(ele) }
              src="shareIcon"
            >
              Share
            </button>
            <button
              onClick={ () => setFavorite(ele.id) }
              style={ { color: 'red', fontStyle: 'italic', borderRadius: '5px' } }
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ YEPFavorited }
            >
              <img src={ YEPFavorited } alt="Black Heart" />
            </button>
            { shared && <p style={ { color: 'red' } }>Link copied!</p> }
            <button
              onClick={ () => routeChange(ele) }
              type="button"
              style={ { color: 'red', fontStyle: 'italic', borderRadius: '5px' } }
              data-testid={ `${index}-horizontal-image` }
              src={ ele.image }
            >
              <h2
                data-testid={ `${index}-horizontal-top-text` }
                style={ { color: 'red' } }
              >
                { ele.alcoholicOrNot !== '' ? ele.alcoholicOrNot
                  : `${ele.nationality} - ${ele.category}` }
              </h2>
              <img
                style={ {
                  height: 200,
                  width: 350,
                } }
                src={ ele.image }
                alt={ ele.name }
              />
            </button>
            <button
              data-testid={ `${index}-horizontal-name` }
              type="button"
              onClick={ () => routeChange(ele) }
            >
              <h3 style={ { color: 'red' } }>
                {' '}
                {ele.name}
                {' '}
              </h3>
            </button>
          </div>
        ))}
    </div>
  );
}

export default FavoriteRecipes;
