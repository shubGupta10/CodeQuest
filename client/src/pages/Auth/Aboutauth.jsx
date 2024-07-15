import React, {useEffect} from 'react'
import { useTranslation } from 'react-i18next'

const Aboutauth = () => {

  const currentLanguage = localStorage.getItem("i18nextLng");

  useEffect(() => {
    if (currentLanguage === "fr") {
      document.body.style.backgroundColor = "yellow";
      document.querySelector('.auth-container-1').style.color = "black";
    } else if (currentLanguage === "en-US") {
      document.body.style.backgroundColor = "white";
      document.querySelector('.auth-container-1').style.color = "black";
    } else if (currentLanguage === "hi") {
      document.body.style.backgroundColor = "blue";
      document.querySelector('.auth-container-1').style.color = "white";
    } else if (currentLanguage === "zh") {
      document.body.style.backgroundColor = "green";
      document.querySelector('.auth-container-1').style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      document.querySelector('.auth-container-1').style.color = "black";
    }
  }, [currentLanguage]);


  const {t} = useTranslation();
  return (
    <div className="auth-container-1">
      <h1>{t('auth.joinCommunity')}</h1>
      <p>{t('auth.askQuestion')}</p>
      <p>{t('auth.unlockPrivileges')}</p>
      <p>{t('auth.saveFavorites')}</p>
      <p>{t('auth.earnReputation')}</p>
      <p style={{ fontSize: "13px", color: "#666767" }}>
      {t('auth.collaborate')}
      </p>
      <p style={{ fontSize: "13px", color: "#007ac6" }}>
      {t('auth.teamfree')}
      </p>
    </div>
  )
}

export default Aboutauth