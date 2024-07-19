import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import bars from "../../assets/bars-solid.svg";
import logo from "../../assets/logo.png";
import search from "../../assets/search-solid.svg";
import Avatar from "../Avatar/Avatar";
import "./navbar.css";
import { setcurrentuser } from "../../action/currentuser";
import { jwtDecode } from "jwt-decode";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";

function Navbar({ handleslidein }) {
  const { t } = useTranslation();
  var User = useSelector((state) => state.currentuserreducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentLanguage = localStorage.getItem("i18nextLng");

  useEffect(() => {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(navItem => {
      if (currentLanguage === "fr") {
        document.body.style.backgroundColor = "yellow";
      } else if (currentLanguage === "en-US") {
        document.body.style.color = "black";
      } else if (currentLanguage === "hi") {
        document.body.style.backgroundColor = "blue";
        navItem.style.color = "white";
      } else if (currentLanguage === "zh") {
        document.body.style.backgroundColor = "green";
        navItem.style.color = 'white'; 
      } else {
        document.body.style.backgroundColor = "white";
      }
    });
  }, [currentLanguage]);

  useEffect(() => {
    const logoutButton = document.getElementById('#logoutBtn');
    if (logoutButton) {
      if(currentLanguage === 'fr'){
        logoutButton.style.color = 'black';
      } else if(currentLanguage === 'en-US'){
        logoutButton.style.color = 'black'
      } else if(currentLanguage === 'hi'){
        logoutButton.style.color = 'white'
      } else if(currentLanguage === 'zh'){
        logoutButton.style.color = 'white';
        logoutButton.style.backgroundColor = 'black'
      }
    }
  }, [currentLanguage]);

  const handlelogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    window.location.reload();
    localStorage.removeItem('Profile');
    dispatch(setcurrentuser(null));
  };

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedtoken = jwtDecode(token);
      if (decodedtoken.exp * 1000 < new Date().getTime()) {
        handlelogout();
      }
    }
    dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
  }, [User?.token, dispatch]);

  return (
    <nav className="main-nav">
      <div className="navbar">
        <button className="slide-in-icon" onClick={() => handleslidein()}>
          <img src={bars} alt="bars" width="15" />
        </button>
        <div className="navbar-1">
          <Link to="/" className="nav-item nav-logo">
            <img src={logo} alt="logo" />
          </Link>
          <Link to="/" className="nav-item nav-btn res-nav">
            {t("navbar.abouttext")}
          </Link>
          <Link to="/" className="nav-item nav-btn res-nav">
            {t("navbar.producttext")}
          </Link>
          <Link to="/" className="nav-item nav-btn res-nav">
            {t("navbar.forteamtext")}
          </Link>

          <form>
            <input type="text" placeholder="Search..." />
            <img src={search} alt="search" width="18" className="search-icon" />
          </form>
        </div>
        <LanguageSwitcher />

        <div className="navbar-2">
          {User === null ? (
            <Link to="/Auth" className="nav-item nav-links">
              {t("navbar.login")}
            </Link>
          ) : (
            <>
              <Avatar
                backgroundColor="#009dff"
                px="15px"
                py="7px"
                borderRadius="50%"
                color="white"
              >
                <Link
                  to={`/Users/${User?.result?._id}`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {User.result.name.charAt(0).toUpperCase()}
                </Link>
              </Avatar>
              <button
                className="nav-item nav-links"
                id="logoutBtn"
                style={{ marginLeft: "7px" }}
                onClick={handlelogout}
              >
                {t("navbar.logout")}
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;