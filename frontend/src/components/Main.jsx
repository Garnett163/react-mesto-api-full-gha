import React from 'react';
import pencil from '../images/Vector.png';
import Card from './Card';

import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__avatar-container'>
          <img className='profile__avatar' src={currentUser.avatar} alt='Аватар портфолио' />
          <button className='profile__avatar-button' onClick={props.onEditAvatar}>
            <img className='profile__avatar-image-button' src={pencil} alt='Карандаш' />
          </button>
        </div>
        <div className='profile__info'>
          <h1 className='profile__title'>{currentUser.name}</h1>
          <button className='profile__edit-button' onClick={props.onEditProfile}></button>
          <p className='profile__subtitle'>{currentUser.about}</p>
        </div>
        <button className='profile__add-button' onClick={props.onAddPlace}></button>
      </section>
      <section className='elements'>
        <ul className='elements__list'>
          {props.cards.map((card) => (
            <Card
              key={card._id}
              name={card.name}
              link={card.link}
              likes={card.likes}
              card={card}
              _id={card._id}
              owner={card.owner}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
