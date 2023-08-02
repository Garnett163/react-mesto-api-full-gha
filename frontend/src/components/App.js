import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import PopupWithConfirm from './PopupWithConfirm';
import InfoTooltip from './InfoTooltip';
import ImagePopup from './ImagePopup';

import CurrentUserContext from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';
import { authApi } from '../utils/AuthApi';

import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  const [cardToDelete, setCardToDelete] = useState(null);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (isLoggedIn) {
      api
        .getUserInfo(jwt)
        .then((data) => {
          setCurrentUser(data);
          setUserEmail(data.email);
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        });
      api
        .getInitialCards(jwt)
        .then((data) => {
          setCards(data.reverse());
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        });
    }
  }, [isLoggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleConfirmClick(card) {
    setConfirmPopupOpen(true);
    setCardToDelete(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [isEditProfilePopupOpen, isEditAvatarPopupOpen, isAddPlacePopupOpen, isConfirmPopupOpen]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id !== currentUser._id);
    const jwt = localStorage.getItem('jwt');

    api
      .changeLikeCardStatus(card._id, isLiked, jwt)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  function handleCardDelete() {
    const jwt = localStorage.getItem('jwt');
    setIsSubmitted(true);
    if (cardToDelete) {
      api
        .deleteCard(cardToDelete._id, jwt)
        .then(() => {
          const newCards = cards.filter((card) => card._id !== cardToDelete._id);
          setCards(newCards);
          closeAllPopups();
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        })
        .finally(() => {
          setIsSubmitted(false);
        });
    }
  }

  function handleUpdateUser(data) {
    const jwt = localStorage.getItem('jwt');
    setIsSubmitted(true);
    api
      .editUserInfo(data, jwt)
      .then((response) => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      })
      .finally(() => {
        setIsSubmitted(false);
      });
  }

  function handleUpdateAvatar(data) {
    const jwt = localStorage.getItem('jwt');
    setIsSubmitted(true);
    api
      .changeAvatar(data, jwt)
      .then((response) => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      })
      .finally(() => {
        setIsSubmitted(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    const jwt = localStorage.getItem('jwt');
    setIsSubmitted(true);
    api
      .addNewCard(data, jwt)
      .then((response) => {
        setCards([response, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      })
      .finally(() => {
        setIsSubmitted(false);
      });
  }

  function handleRegisterSubmit(email, password) {
    authApi
      .signUp(email, password)
      .then((response) => {
        setIsSuccessOpen(true);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        setIsSuccessOpen(false);
        console.log(`Error: ${err}`);
      })
      .finally(() => setIsInfoTooltipOpen(true));
  }

  function handleLoginSubmit(email, password) {
    authApi
      .signIn(email, password)
      .then((response) => {
        localStorage.setItem('jwt', response.token);
        setIsLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    authApi
      .getToken(jwt)
      .then((response) => {
        if (!response) {
          return;
        } else {
          setIsLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
        setUserEmail(null);
        console.log(`Error: ${err}`);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function signOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    navigate('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header signOut={signOut} userEmail={userEmail} />
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleConfirmClick}
                cards={cards}
                loggedIn={isLoggedIn}
              />
            }
          />
          <Route path='/sign-up' element={<Register onRegister={handleRegisterSubmit} />}></Route>
          <Route path='/sign-in' element={<Login onLogin={handleLoginSubmit} />}></Route>
        </Routes>

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isSubmitted={isSubmitted} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isSubmitted={isSubmitted} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isSubmitted={isSubmitted} />
        <PopupWithConfirm isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onConfirm={handleCardDelete} isSubmitted={isSubmitted} />
        <InfoTooltip name={'tooltip'} isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isSuccess={isSuccessOpen} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

// CUSTOM HOOK FOR INPUTS

// export function useForm(inputValues) {
//   const [values, setValues] = useState(inputValues);

//   const handleChange = (event) => {
//     const {value, name} = event.target;
//     setValues({...values, [name]: value});
//   };
//   return {values, handleChange, setValues};
// }

// VALIDATION

// import {useState, useCallback} from 'react';

// export function useFormAndValidation() {
//   const [ values, setValues ] = useState({});
//   const [ errors, setErrors ] = useState({});
//   const [ isValid, setIsValid ] = useState(true);

//   const handleChange = (e) => {
//     const {name, value} = e.target
//     setValues({...values, [name]: value });
//     setErrors({...errors, [name]: e.target.validationMessage});
//     setIsValid(e.target.closest('form').checkValidity());
//   };

//   const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
//     setValues(newValues);
//     setErrors(newErrors);
//     setIsValid(newIsValid);
//   }, [setValues, setErrors, setIsValid]);

//   return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
// }

// const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation()
