import React from "react";

function PopupWithForm(props) {
  
  return (
    <section className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
      <h2 className="popup__title">{props.title}</h2>
        <form onSubmit={props.onSubmit} name={`popup_${props.name}`} className={`popup__form popup__form-${props.name}`} /**noValidate*/>
          {props.children}
          <button className="popup__save popup__add" type="submit">{props.buttonText}</button>
        </form>
        <button className="popup__close" type="button" onClick={props.onClose}></button>
      </div>
    </section>
  );
}

export default PopupWithForm;