import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Mestologo from '../images/Mesto-logo.svg';

function Header({ userEmail, signOut }) {
  return (
    <header className='header'>
      <img className='header__logo' src={Mestologo} alt='Логотип Место' />
      <Routes>
        <Route
          path='/sign-in'
          element={
            <Link to='/sign-up' className='header__link'>
              Регистрация
            </Link>
          }></Route>
        <Route
          path='/sign-up'
          element={
            <Link to='/sign-in' className='header__link'>
              Войти
            </Link>
          }></Route>

        <Route
          path='/'
          element={
            <div className='header__container'>
              <p className='header__email'>{userEmail}</p>
              <Link to='/sign-in' className='header__link_exit' onClick={signOut}>
                Выйти
              </Link>
            </div>
          }></Route>
      </Routes>
    </header>
  );
}

export default Header;
