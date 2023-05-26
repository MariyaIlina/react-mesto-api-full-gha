import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  onCardClick,
  card,
  link,
  name,
  like,
  onCardDelete,
  onCardLike,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser.currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i === currentUser.currentUser._id);
  console.log('isLiked', card.likes)
  console.log('currentUser.currentUser._id=>', currentUser.currentUser._id)
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : "element__like"
  }`;

  const cardDeleteButtonClassName = `element__delete ${
    isOwn ? "" : "element__delete_none"
  }`;

  function handleClick() {
    onCardClick(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }
  return (
    <div className="element">
      <img
        className="element__mask-group"
        onClick={handleClick}
        src={link}
        alt={name}
      />
      <button
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
        type="button"
        arial-label="delete"
      />
      <div className="element__group">
        <h2 className="element__text">{name}</h2>
        <div className="element__group-like">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
            aria-label="like"
          ></button>
          <span className="element__like-counter">{like.length}</span>
        </div>
      </div>
    </div>
  );
}
export default Card;
