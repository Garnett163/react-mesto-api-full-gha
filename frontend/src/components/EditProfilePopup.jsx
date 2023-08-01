import React from 'react';
import PopupWithForm from './PopupWithForm';

import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name={'edit'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title={'Редактировать профиль'}
      textButton={props.isSubmitted ? 'Сохранение...' : 'Сохранить'}
      children={
        <>
          <div className='popup__input-box'>
            <input
              className='popup__input'
              name='name'
              id='inputNameEditProfile'
              type='text'
              placeholder='Имя Пользователя'
              minLength='2'
              maxLength='40'
              required
              onChange={handleNameChange}
              value={name || ''}
            />
            <span className='popup__input-error inputNameEditProfile-error'></span>
          </div>
          <div className='popup__input-box'>
            <input
              className='popup__input'
              name='about'
              id='inputDescriptionEditProfile'
              type='text'
              placeholder='О себе'
              minLength='2'
              maxLength='200'
              required
              onChange={handleDescriptionChange}
              value={description || ''}
            />
            <span className='popup__input-error inputDescriptionEditProfile-error'></span>
          </div>
        </>
      }
    />
  );
}

export default EditProfilePopup;
