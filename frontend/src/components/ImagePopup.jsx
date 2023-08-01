import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.card ? 'popup_open' : ''}`}>
      <figure className='popup__image-container'>
        <button className='popup__close-button' type='button' onClick={props.onClose}></button>
        <img
          className='popup__image'
          src={props.card ? props.card.link : '#'}
          alt={props.card ? props.card.name : ''}
        />
        <figcaption className='popup__image-title'>{props.card ? props.card.name : ''}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
