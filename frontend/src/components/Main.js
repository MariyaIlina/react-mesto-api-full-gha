import React from "react";
import { useEffect, useContext } from "react";
import { api } from "../utils/api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,

}) {
  const { currentUser, cards } = useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;
  return (
    <main className="content">
      <section className="profile root__profile">
        <div
          style={{ backgroundImage: `url(${avatar})` }}
          className="profile__avatar"
          name="avatar"
          alt={name}
        />
        <button
          className="profile__avatar-edit"
          onClick={onEditAvatar}
        ></button>
        <div className="profile__info">
          <div>
            <h1 className="profile__name">{name}</h1>
            <p className="profile__text">{about}</p>
          </div>
          <button
            className="profile__edit"
            onClick={onEditProfile}
            type="button"
            aria-label="edit"
          ></button>
        </div>
        <button
          className="profile__add"
          onClick={onAddPlace}
          type="button"
          aria-label="add"
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            name={card.name}
            link={card.link}
            like={card.likes}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            card={card}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;
