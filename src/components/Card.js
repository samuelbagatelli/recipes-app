import React from 'react';
import { number, string } from 'prop-types';

function Card({ title, category, image, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <p>{ category }</p>
      <h2 data-testid={ `${index}-card-name` }>{ title }</h2>
      <img
        alt="Recipe thumb"
        data-testid={ `${index}-card-img` }
        src={ `${image}` }
      />
    </div>
  );
}

Card.propTypes = {
  category: string.isRequired,
  image: string.isRequired,
  title: string.isRequired,
  index: number.isRequired,
};

export default Card;
