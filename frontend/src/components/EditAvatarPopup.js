import React, {useRef} from "react"
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup(props){
  const avatarRef = useRef()

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
    avatarRef.current.value=''
  }

  return(
    <PopupWithForm
          name="user-avatar"
          title="Обновить аватар"
          children=""
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
        >
          <input
            id="user-avatar-input"
            className="popup__text popup__text_user-avatar"
            aria-label="Введите ссылку на аватар"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            required
            ref={avatarRef}
          />
          <p className="popup__error">
            <span id="user-avatar-input-error"></span>
          </p>
        </PopupWithForm>
  )
}
export default EditAvatarPopup