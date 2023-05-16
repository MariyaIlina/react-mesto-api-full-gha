import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function Login({ onLogin, isLoggedIn }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((userData) => ({
      ...userData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      return;
    }
    onLogin(userData.email, userData.password);
  };

  if (isLoggedIn) {
    return navigate("/");
  }
  return (
    <div className="login">
      <Header navStatus={"Регистрация"} nav={"/sign-up"} />
      <p className="login__entry">Вход</p>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          name="email"
          placeholder="Email"
          value={userData.email}
          type="email"
          onChange={handleChange}
        />
        <input
          className="login__input"
          name="password"
          placeholder="Пароль"
          value={userData.password}
          type="password"
          onChange={handleChange}
        />
        <button type="submit" onSubmit={handleSubmit} className="login__button">
          Войти
        </button>
      </form>
    </div>
  );
}
