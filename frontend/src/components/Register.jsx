import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password);
  }

  return (
    <form className='authentication__form' name='register' onSubmit={handleSubmit}>
      <h2 className='authentication__header'>Регистрация</h2>
      <input
        className='authentication__input'
        id='inputEmail'
        name='email'
        type='email'
        placeholder='Email'
        required
        minLength='5'
        maxLength='25'
        onChange={handleEmailChange}
        value={email}
      />
      <input
        className='authentication__input'
        id='inputPassword'
        name='password'
        type='password'
        placeholder='Пароль'
        required
        minLength='3'
        maxLength='25'
        onChange={handlePasswordChange}
        value={password}
      />
      <button className='authentication__button' type='submit'>
        Зарегистрироваться
      </button>
      <p className='authentication__text'>
        Уже зарегестрированы?{' '}
        <Link to='/sign-in' className='authentication__link'>
          Войти
        </Link>
      </p>
    </form>
  );
}

export default Register;
