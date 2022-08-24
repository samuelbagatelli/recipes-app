import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import shareIcon from '../images/shareIcon.svg';

function DoneCard({ element, index }) {
  const history = useHistory();

  const {
    id,
    type,
    alcoholicOrNot,
    nationality,
    category,
    name,
    doneDate,
    tags,
    image,
  } = element;

  const {
    copied,
    setCopied,
  } = useContext(AppContext);

  const handleShare = () => {
    const TWO_SECONDS = 1500;
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, TWO_SECONDS);
  };

  const handleClick = () => {
    if (type === 'drink') {
      history.push(`/drinks/${id}`);
    } else {
      history.push(`/foods/${id}`);
    }
  };

  return (
    <div>
      <span
        data-testid={ `${index}-horizontal-top-text` }
      >
        {type === 'drink'
          ? alcoholicOrNot
          : `${nationality} - ${category}`}
      </span>
      <button
        type="button"
        onClick={ handleShare }
      >
        <img
          name="share"
          alt="share button"
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
        />
      </button>
      {copied && <span>Link copied!</span>}
      <a
        data-testid={ `${index}-horizontal-name` }
        href={ `http://localhost:3000/${type}s/${id}` }
      >
        {name}
      </a>
      <p data-testid={ `${index}-horizontal-done-date` }>
        Done in:
        {' '}
        {doneDate}
      </p>
      <div>
        {tags && tags.map((tagName, idx) => (
          <p
            key={ idx }
            data-testid={ `${index}-${tagName}-horizontal-tag` }
          >
            {tagName}
          </p>
        ))}
      </div>
      <input
        className="w-25"
        alt="Recipe thumb"
        data-testid={ `${index}-horizontal-image` }
        src={ image }
        type="image"
        onClick={ handleClick }
      />
    </div>
  );
}

DoneCard.propTypes = {
  category: PropTypes.string,
  doneDate: PropTypes.string,
  image: PropTypes.string,
  nationality: PropTypes.string,
  tags: PropTypes.array,
  title: PropTypes.string,
}.isRequired;

export default DoneCard;
