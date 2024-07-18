import React, { useState, useEffect } from 'react';
import './SendOTP.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useTranslation} from 'react-i18next';

const SendOTP = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const navigate = useNavigate();
  const {t} = useTranslation();

  const currentLanguage = localStorage.getItem('i18nextLng');

  useEffect(() => {
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
      if (currentLanguage === 'fr') {
        container.style.backgroundColor = 'yellow';
      } else if (currentLanguage === 'hi') {
        container.style.backgroundColor = 'blue';
      } else if (currentLanguage === 'zh') {
        container.style.backgroundColor = 'green';
        document.querySelector('.title').style.color = 'white';
        document.querySelector('.subtitle').style.color = 'white';
      } else {
        container.style.backgroundColor = 'white';
      }
    })
  
  }, [currentLanguage]);

  const handleChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const clicktoSend = async () => {
    try {
      const response = await axios.post("http://localhost:5000/user/send-otp", {
        phoneNumber: phoneNumber
      });
      setMessage(response.data.msg);
      setMessageColor('green');
      navigate("/verify-otp")
    } catch (error) {
      console.error("Failed to send otp:", error);
      // Twilio is a safe and paid service so, we cant send otp to unknown numbers, only registered numbers are allowed.
      setMessage("Register your account on Twilio. Please try again with registered account.");
      setMessageColor('red'); 
    }
  };

  return (
    <div className="container">
      <h1 className="title">{t('sendOTP.EnterNumber')}</h1>
      <p className="subtitle">{t('sendOTP.countryCode')}</p>
      <input
        type="text"
        placeholder={t('sendOTP.numberPlaceholder')}
        className="input"
        value={phoneNumber}
        onChange={handleChange}
      />
      <button onClick={clicktoSend} className="button">
        {t('sendOTP.sendOtp')}
      </button>
      {message && <p className="message" style={{ color: messageColor }}>{message}</p>}
    </div>
  );
};

export default SendOTP;
