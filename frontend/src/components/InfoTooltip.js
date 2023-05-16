import React from "react";
import checkmark from "../images/checkmark.svg";
import cross from "../images/cross.svg";

export default function InfoTooltip(props) {
  return (
    <section className="popup popup_login popup_is-opened">
      <div className="popup__container popup__container_login">
        <div className="popup__content popup__content_login">
          <button
            className="popup__close popup__close_login"
            type="button"
            onClick={props.onClose}
          ></button>
          <img
            src={props.status ? checkmark : cross}
            alt={props.status ? "Успех" : "Ошибка"}
            className="popup__icon"
          />
          <h3 className="popup__title popup__title_login">
            {props.status
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </h3>
        </div>
      </div>
    </section>
  );
}
