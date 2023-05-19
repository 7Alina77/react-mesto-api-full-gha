import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({_id, card, link, name, likes, onClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  
  const cardLikeButtonClassName = ( 
  `elements__like ${isLiked && 'elements__like_active'}` 
  );;
  
  function handleClick() {
    onClick(card);
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <article className="elements__item" key={_id}>
      {isOwn && <button type="button" className='elements__trash' onClick={handleDeleteClick} />}
      <img className="elements__image" alt={name} src={`${link}`} onClick = {handleClick}/>
      <div className="elements__group">
        <p className="elements__title">{name}</p>
          <div className="elements__group_liked">
            <button type="submit" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
            <p className="elements__like-count">{likes.length}</p>
          </div>
      </div>
    </article>
  );
}

export default Card;