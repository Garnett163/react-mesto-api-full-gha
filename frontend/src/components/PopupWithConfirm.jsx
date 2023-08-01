import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupWithConfirm(props) {
  function handleSubmit(evt) {
    evt.preventDefault();

    props.onConfirm(props.card);
  }

  return (
    <PopupWithForm
      name={'confirm'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title={'Вы уверены?'}
      textButton={props.isSubmitted ? 'Удаление..' : 'Да'}
    />
  );
}

export default PopupWithConfirm;
