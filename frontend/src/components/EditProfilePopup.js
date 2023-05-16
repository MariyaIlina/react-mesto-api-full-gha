import React, { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser.currentUser.name !== undefined) {
      setName(currentUser.currentUser.name);
    }
    if (currentUser.currentUser.about !== undefined) {
      setDescription(currentUser.currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__text popup__text_profile_name"
        name="name"
        required
        placeholder="Введите имя"
        type="text"
        minLength="2"
        maxLength="40"
        id="popup-profile-name"
        value={name}
        onChange={handleNameChange}
      />
      <p className="popup__error">
        <span id="popup-profile-name-error"></span>
      </p>
      <input
        className="popup__text popup__text_profile_job"
        name="about"
        required
        placeholder="Введите профессию"
        type="text"
        minLength="2"
        maxLength="200"
        id="popup-profile-job"
        value={description}
        onChange={handleDescriptionChange}
      />
      <p className="popup__error">
        <span id="popup-profile-job-error"></span>
      </p>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
