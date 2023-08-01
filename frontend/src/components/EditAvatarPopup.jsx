import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef(null);

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    // avatarRef.current.value = null;
  }

  React.useEffect(() => {
    avatarRef.current.value = null;
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name={'avatar'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title={'Обновить Аватар'}
      textButton={props.isSubmitted ? 'Сохранение...' : 'Сохранить'}
      children={
        <div className='popup__input-box'>
          <input
            className='popup__input popup__input_url'
            name='avatar'
            type='url'
            id='inputImageUrlAvatarProfile'
            placeholder='Ссылка на аватар'
            required
            ref={avatarRef}
          />
          <span className='popup__input-error inputImageUrlAvatarProfile-error'></span>
        </div>
      }
    />
  );
}

export default EditAvatarPopup;
