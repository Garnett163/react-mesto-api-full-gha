import React from 'react';
import successPopup from '../images/successPopup.png';
import cancelPopup from '../images/cancelPopup.png';

function InfoTooltip(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_open' : ''}`}>
      <div className='popup__container'>
        <button className='popup__close-button' type='button' onClick={props.onClose}></button>
        <form className='popup__form' name={`${props.name}Form`} action='#' method='GET'>
          <img className='popup__image_tooltip' src={props.isSuccess ? successPopup : cancelPopup} alt={props.name} />
          <fieldset className='popup__fieldset'>
            {props.children}
            <legend className='popup__title_tooltip'>
              {props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}
            </legend>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default InfoTooltip;
