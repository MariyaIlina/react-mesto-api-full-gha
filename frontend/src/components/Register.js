import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

export default function Register(props) {
  const { onRegister, isLoggedIn } = props;
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((userData) => ({
      ...userData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(userData.email, userData.password);
  };

  if (isLoggedIn) {
    return navigate("/");
  }
  return (
    <div className="register">
      <Header navStatus={"Войти"} nav={"/sign-in"} />
      <p className="register__title">Регистрация</p>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          id="email"
          type="email"
          className="register__input"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={userData.email}
        />
        <input
          id="password"
          type="password"
          className="register__input"
          name="password"
          placeholder="Пароль"
          onChange={handleChange}
          value={userData.password}
        />
        <button
          className="register__button"
          type="submit"
          onSubmit={handleSubmit}
        >
          Зарегистрироваться
        </button>
      </form>
      <div className="register__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__link">
          Войти
        </Link>
      </div>
    </div>
  );
}
