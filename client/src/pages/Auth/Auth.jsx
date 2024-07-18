import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import icon from "../../assets/icon.png";
import Aboutauth from "./Aboutauth";
import { signup, login } from "../../action/auth";
import { useTranslation } from 'react-i18next';

const Auth = () => {
  const [issignup, setissignup] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { t } = useTranslation(); 

  const currentLanguage = localStorage.getItem("i18nextLng");

  useEffect(() => {
    if (currentLanguage === "fr") {
      document.querySelector('.auth-section ').style.backgroundColor = "yellow";
      document.querySelector('.auth-container-2 form').style.backgroundColor = "yellow";
      document.querySelector('.auth-container-2').style.color = "black";
    } else if (currentLanguage === "en-US") {
      document.body.style.backgroundColor = "white";
      document.querySelector('.auth-container-2').style.color = "black";
    } else if (currentLanguage === "hi") {
      document.body.style.backgroundColor = "blue";
      document.querySelector('.auth-container-2 form').style.color = "black";
      document.querySelector('.handle-switch-btn').style.color = 'white'
      document.querySelector('.isSignup').style.color = 'white'
    } else if (currentLanguage === "zh") {
      document.body.style.backgroundColor = "green";
      document.querySelector('.auth-container-2').style.color = "black";
      document.querySelector('.isSignup').style.color = 'white'
      document.querySelector('.handle-switch-btn').style.color = 'white'
    } else {
      document.body.style.backgroundColor = "white";
      document.querySelector('.auth-container-2').style.color = "black";
    }
  }, [currentLanguage]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!email && !password) {
      alert(t('auth.successAlert'));
    }
    if (issignup) {
      if (!name) {
        alert(t("auth.nameEnter"));
      }
      dispatch(signup({ name, email, phoneNumber, password }, navigate));
    } else {
      dispatch(login({ email, password }, navigate));
    }
  };

  const handleswitch = () => {
    setissignup(!issignup);
    setname("");
    setemail("");
    setpassword("");
    setPhoneNumber("");
  };

  return (
    <section className="auth-section">
      {issignup && <Aboutauth />}
      <div className="auth-container-2">
        <img src={icon} alt="icon" className="login-logo" />
        <form onSubmit={handlesubmit}>
          {issignup && (
            <>
              <label htmlFor="name">
                <h4>{t('auth.displayName')}</h4>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </>
          )}
          <label htmlFor="email">
            <h4>{t('auth.email')}</h4>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>{t('auth.password')}</h4>
              {!issignup && (
                <Link to="/choose">
                  <p
                    style={{
                      color: "#007ac6",
                      fontSize: "13px",
                      cursor: "pointer",
                      textDecoration: "none",
                    }}
                  >
                    {t('auth.forgotPassword')}
                  </p>
                </Link>
              )}
            </div>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          {issignup && (
            <>
              <label htmlFor="phoneNumber">
                <h4>{t('auth.phoneNumber')}</h4>
              </label>
              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </>
          )}
          <button type="submit" className="auth-btn">
            {issignup ? t('auth.signup') : t('auth.login')}
          </button>
        </form>
        <p className="isSignup">
          {issignup ? t('auth.alreadyHaveAccount') : t('auth.dontHaveAccount')}
          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleswitch}
          >
            {issignup ? t('auth.login') : t('auth.signup')}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Auth;
