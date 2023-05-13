import React from "react";
import { useEffect, useState } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const isOpen = props.isOpen;
  const [name,setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = React.useContext(CurrentUserContext);
  
  useEffect(() => {
    setName(currentUser ? currentUser.name : "");
    setDescription(currentUser ? currentUser.about : "");
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm 
      onSubmit = {handleSubmit}
      onClose={props.onClose} 
      isOpen = {props.isOpen} 
      name = 'edit'  
      title = 'Редактировать профиль'
      buttonText = 'Сохранить'
      children = {
        <>
          {currentUser &&<input id="name-input" value={name} onChange={handleChangeName} required type="text" name="title" className="popup__input popup__input_type_name" placeholder="Имя" minLength="2" maxLength="40" />}
          <p className="popup__input-error name-input-error"></p>
          {currentUser &&<input id="about-input" value={description} onChange={handleChangeDescription} required type="text" name="about" className="popup__input popup__input_type_about" placeholder="О себе" minLength="2" maxLength="200" />}
          <p className="popup__input-error about-input-error"></p>
        </>
      }
    />
  )
}

export default EditProfilePopup;