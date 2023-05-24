import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";
function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const INITIAL_USER = { email: "", password: "" };
  const [userData, setUserData] = useState(INITIAL_USER);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [infoPopup, setInfoPopup] = useState({
    isOpenLoginPopup: false,
    status: false,
    message: "",
  });
  function handleInfoPopup() {
    setInfoPopup(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setInfoPopup(false);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(user) {
    api
      .editProfile(user)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(user) {
    api
      .editAvatar(user)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getImages()])
        .then(([data, card]) => {
          setCurrentUser(data);
          setCards(card);
        })
        .catch((err) => console.log('errr!!=>', err));
    }
  }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      cbTokenCheck(location.pathname);
      console.log('token=>', token);
    }
  }, [location.pathname]);

  const cbTokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    console.log('=>', jwt)
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);console.log('jwt=>', jwt)
            console.log("res.data=>", res.user.email)
            setUserData(res.user.email);
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const openPopup = () => {
    setInfoPopup((prevState) => ({
      ...prevState,
      isOpenLoginPopup: true,
    }));
  };

  const closePopup = () => {
    setInfoPopup((prevState) => ({
      ...prevState,
      isOpenLoginPopup: false,
    }));
    if (infoPopup.status) navigate("/sign-in");
  };

  const cbRegister = (email, password) => {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setInfoPopup({
            message: "Успешно зарегистрировались",
            status: true,
            isOpenLoginPopup: false,
          });
          openPopup();
          navigate("/");
        }
      })
      .catch((err) => {
        setInfoPopup({
          message: "Что-то пошло не так!",
          status: false,
          isOpenLoginPopup: false,
        });
        openPopup();
      });
  };

  const cbLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          setUserData(email);
          setLoggedIn(true);
          localStorage.setItem("jwt", res.token);console.log('setUserData=>', res.token)
          navigate("/");
        }
      })
      .catch((err) => {
        setInfoPopup({
          message: "Что-то пошло не так!",
          status: false,
          isOpenLoginPopup: false,
        });
        openPopup();
        console.log(err);
      });
  };

  const cbLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserData("");
    navigate("/sign-in");
  };

  return (
    <div className="root">
      <CurrentUserContext.Provider value={{ currentUser, cards }}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <>
                  <Header
                    nav={"/sign-in"}
                    navStatus={"Выйти"}
                    emailUser={userData}
                    onLogout={cbLogout}
                  />
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                  <Footer />
                  <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                  />
                  <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                  />
                  <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                  />
                  <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={cbRegister} isLoggedIn={loggedIn} />}
          />
          <Route
            path="/sign-in"
            element={<Login onLogin={cbLogin} isLoggedIn={loggedIn} />}
          />
        </Routes>
      </CurrentUserContext.Provider>
      {infoPopup.isOpenLoginPopup && (
        <InfoTooltip status={infoPopup.status} onClose={closePopup} />
      )}
    </div>
  );
}
export default App;
