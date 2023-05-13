import React  from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({card, isOpen, onClose, onDeleteCard}) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card);
  }

  return (
    <PopupWithForm
      onSubmit = {handleSubmit}
      onClose={onClose}
      isOpen = {isOpen}
      name = 'confirmation'
      title = 'Вы уверены?'
      buttonText = 'Да'
    />
  )
}

export default DeleteCardPopup;