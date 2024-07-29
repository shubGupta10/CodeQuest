import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LoginHistory.css";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const translationCache = {};

const fetchTranslations = async (texts, targetLang) => {
  const uniqueTexts = [...new Set(texts)];
  const translations = {};

  for (const text of uniqueTexts) {
    const cacheKey = `${text}|${targetLang}`;
    if (translationCache[cacheKey]) {
      translations[text] = translationCache[cacheKey];
    } else {
      try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
        const data = await response.json();
        if (data.responseStatus === 200) {
          const translatedText = data.responseData.translatedText;
          translationCache[cacheKey] = translatedText;
          translations[text] = translatedText;
        } else {
          translations[text] = text;
        }
      } catch (error) {
        console.error('Translation failed:', error);
        translations[text] = text;
      }
    }
  }

  return translations;
};

const LoginHistory = () => {
  const [loginHistory, setLoginHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem('i18nextLng') || 'en';
  
  useEffect(() => {
    const container = document.querySelector('.Container');
    
    if (container) {
      if (currentLanguage === "fr") {
        container.style.backgroundColor = 'yellow';
      } else if (currentLanguage === "en") {
        container.style.backgroundColor = 'white';
        document.body.style.color = "black";
      } else if (currentLanguage === "hi") {
        container.style.backgroundColor = "blue";
        document.body.style.color = "white";
      } else if (currentLanguage === "zh") {
        container.style.backgroundColor = "green";
        document.body.style.color = "white";
      } else {
        container.style.backgroundColor = "white";
        document.body.style.color = "black";
      }
    }
  }, [currentLanguage]);

  useEffect(() => {
    const fetchLoginHistory = async () => {
      try {
        const userProfile = JSON.parse(localStorage.getItem("Profile"));
        if (!userProfile || !userProfile.result._id) {
          console.error("User profile or ID not found in localStorage");
          return;
        }
        const userId = userProfile.result._id;
        const response = await axios.get(
          'https://codequest-emf6.onrender.com/user/login-history/${userId}'
        );

        const latestLogin = response.data;
        const logins = Array.isArray(latestLogin) ? latestLogin : [latestLogin];

        // Collect all unique values for translation
        const browsers = [...new Set(logins.map(login => login.browser))];
        const oses = [...new Set(logins.map(login => login.os))];
        const devices = [...new Set(logins.map(login => login.device))];

        // Translate all unique values at once
        const [translatedBrowsers, translatedOses, translatedDevices] = await Promise.all([
          fetchTranslations(browsers, currentLanguage),
          fetchTranslations(oses, currentLanguage),
          fetchTranslations(devices, currentLanguage),
        ]);

        const translatedHistory = logins.map(login => ({
          ...login,
          browser: translatedBrowsers[login.browser],
          os: translatedOses[login.os],
          device: translatedDevices[login.device],
        }));

        setLoginHistory(translatedHistory);
      } catch (error) {
        console.error("Error fetching login history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoginHistory();
  }, [currentLanguage]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="Container">
      <h2 className="title">{t('loginhistory.Title')}</h2>
      <div className="table-container">
        <table className="login-table">
          <thead>
            <tr>
              <th>{t('loginhistory.date')}</th>
              <th>{t('loginhistory.browser')}</th>
              <th>{t('loginhistory.os')}</th>
              <th>{t('loginhistory.device')}</th>
              <th>{t('loginhistory.ipaddress')}</th>
            </tr>
          </thead>
          <tbody>
            {loginHistory.length > 0 ? (
              loginHistory.map((login, index) => (
                <tr key={index}>
                  <td>
                    {isNaN(new Date(login.Timestamp).getTime())
                      ? "Invalid Date"
                      : new Date(login.Timestamp).toLocaleString()}
                  </td>
                  <td>{login.browser}</td>
                  <td>{login.os}</td>
                  <td>{login.device}</td>
                  <td>{login.ipAddress}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="no-login-history" colSpan="5">
                  {t('loginhistory.nohistory')}{" "}
                  <Link className="login-btn" to="/Auth">
                    {t('loginhistory.login')}
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoginHistory;