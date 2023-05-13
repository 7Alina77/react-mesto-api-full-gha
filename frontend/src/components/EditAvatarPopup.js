import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  useEffect(()=> {
    avatarRef.current.value = '';
  },[props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  } 

  return (
    <PopupWithForm 
        onSubmit = {handleSubmit}
        onClose={props.onClose} 
        isOpen = {props.isOpen} 
        name = 'avatar'  
        title = 'Обновить аватар' 
        buttonText = 'Сохранить'
        children = {
          <>
            <input id="avatar-input" ref={avatarRef} required type="url" name="avatar" className="popup__input popup__input_type_avatar" placeholder="Ссылка на картинку" />
            <p className="popup__input-error avatar-input-error"></p>
          </>
        }
      />
  )
}

export default EditAvatarPopup;