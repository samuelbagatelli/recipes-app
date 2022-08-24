import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import shareIcon from '../images/shareIcon.svg';

function DoneCard({ element, index }) {
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
    navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, TWO_SECONDS);
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
      <p data-testid={ `${index}-horizontal-name` }>
        {name}
      </p>
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
      <img
        className="w-25"
        alt="Recipe thumb"
        data-testid={ `${index}-horizontal-image` }
        src={ image }
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
