import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const cardsElements = props.cards.map((card) => (
    <Card 
      key={card._id}
      card={card}
      link = {card.link}
      name ={card.name}
      likes = {card.likes}
      onClick={props.onCardClick}
      onCardLike={props.handleLikeClick}
      onCardDelete = {props.handleDeleteClick}
    />
  ))

  return (currentUser &&
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-background" onClick={props.onEditAvatar}>
          <img className="profile__avatar" alt="аватарка" src={`${currentUser.avatar}`} />
        </div>
        <div className="profile__input">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        {cardsElements}
      </section>
    </main>
  );
};

export default Main;