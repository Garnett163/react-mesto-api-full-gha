import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(evt) {
    setName(evt.target.value);
  }
  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name,
      link,
    });
  }
  // cleans inputs on future
  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name={'add'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title={'Новое место'}
      textButton={props.isSubmitted ? 'Создание..' : 'Создать'}
      children={
        <>
          <div className='popup__input-box'>
            <input
              className='popup__input popup__input_name'
              name='name'
              id='inputImageNameAddProfile'
              type='text'
              placeholder='Название'
              minLength='2'
              maxLength='30'
              required
              onChange={handleNameChange}
              value={name}
            />
            <span className='popup__input-error inputImageNameAddProfile-error'></span>
          </div>
          <div className='popup__input-box'>
            <input
              className='popup__input popup__input_url'
              name='link'
              id='inputImageUrlAddProfile'
              type='url'
              placeholder='Ссылка на картинку'
              required
              onChange={handleLinkChange}
              value={link}
            />
            <span className='popup__input-error inputImageUrlAddProfile-error'></span>
          </div>
        </>
      }
    />
  );
}

export default AddPlacePopup;
