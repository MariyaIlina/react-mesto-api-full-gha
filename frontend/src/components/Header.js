import React from "react";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header page__header">
      <img src={logo} alt="логотип" className="header__logo" />
      <div className="header__nav">
        <p className={"header__status"}>{props.emailUser}</p>
        <Link
          to={props.nav}
          className={"header__link header__status"}
          onClick={props.onLogout}
        >
          {props.navStatus}
        </Link>
      </div>
    </header>
  );
}

export default Header;
