import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleLinkChange(event) {
    setLink(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link,
    });
  }
  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      children=""
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__text popup__text_add_name"
        name="name"
        required
        placeholder="Название"
        type="text"
        minLength="2"
        maxLength="30"
        id="popup-add-name"
        value={name}
        onChange={handleNameChange}
      />
      <p className="popup__error">
        <span id="popup-add-name-error"></span>
      </p>
      <input
        className="popup__text popup__text_add_link"
        name="link"
        required
        placeholder="Ссылка на картинку"
        id="popup-add-link"
        type="url"
        value={link}
        onChange={handleLinkChange}
      />
      <p className="popup__error">
        <span id="popup-add-link-error"></span>
      </p>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
