import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(card) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;

  const isLiked = card.likes.some((item) => item._id !== currentUser._id);
  const cardLikeButtonClassName = `elements__like-button ${isLiked && 'elements__like-button_active'}`;

  function handleClick() {
    card.onCardClick(card.card);
  }

  function handleLikeClick() {
    card.onCardLike(card.card);
  }

  function handleDeleteClick() {
    card.onCardDelete(card.card);
  }

  return (
    <li className='elements__item'>
      {isOwn && <button className='elements__delete-button' onClick={handleDeleteClick}></button>}
      <img className='elements__image' src={card.link} alt={card.name} onClick={handleClick} />
      <div className='elements__container'>
        <h2 className='elements__title'>{card.name}</h2>
        <div className='elements__likes-container'>
          <button className={cardLikeButtonClassName} type='button' onClick={handleLikeClick}></button>
          <span className='elements__likes-counter'>{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
