import React from "react";

function ImagePopup(props) {
  const card = props.card;

  return (
      <section className={`popup popup_image ${card ? 'popup_opened' : ''}`}>
        {card &&
          <div className="popup__relative">
            <img className="popup__img" alt={card.name} src={`${card.link}`} />
            <h2 className="popup__img-title">{card.name}</h2>
            <button className="popup__close" type="button" onClick={props.onClose}></button>
          </div>}
      </section>
  )
}

export default ImagePopup;