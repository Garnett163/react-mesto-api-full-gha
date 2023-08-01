import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_open' : ''}`}>
      <div className='popup__container'>
        <button className='popup__close-button' type='button' onClick={props.onClose}></button>
        <form
          className='popup__form'
          name={`${props.name}Form`}
          action='#'
          method='GET'
          onSubmit={props.onSubmit}>
          <fieldset className='popup__fieldset'>
            {props.children}
            <legend className='popup__title'>{props.title}</legend>
            <button type='submit' className='popup__submit-button'>
              {props.textButton}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
