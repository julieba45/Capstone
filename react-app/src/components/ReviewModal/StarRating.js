import React from 'react';
import './StarRating.css';

const StarRating = ({ rating, changeRating }) => {
    return (
      <div className="star-rating">
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => changeRating(ratingValue)}
              />
              <i className={`fas fa-star star ${ratingValue <= rating ? 'gold' : ''}`}></i>
            </label>
          );
        })}
      </div>
    );
  };

  export default StarRating;
