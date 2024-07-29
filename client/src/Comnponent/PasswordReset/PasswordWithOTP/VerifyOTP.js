import React, { useEffect, useState } from 'react';
import './VerifyOTP.css';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const VerifyOTP = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const {t}  = useTranslation();


  const currentLanguage = localStorage.getItem('i18nextLng');

  useEffect(() => {
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
      if(currentLanguage === 'fr'){
        container.style.backgroundColor = 'yellow';
      } else if(currentLanguage === 'hi'){
        container.style.backgroundColor = 'yellow';
      } else if(currentLanguage === 'zh'){
        container.style.backgroundColor = 'green';
        document.querySelector('.title').style.color = 'white';
      } else{
        container.style.backgroundColor = 'white';
      }
    })
    
  },[currentLanguage])
 



  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

                  //***********Context for code*************** */
  // taken little help of chatGpt to find a little bug in the webapp
  const verifyOTPmessage = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/verify-otp`, {
        phoneNumber: phoneNumber,
        otp: otp
      });

      if (response.data.success) {
        setIsVerified(true);
        setMessage("OTP verified successfully! Please enter your new password.");
        setMessageColor('green');
      } else {
        setMessage(response.data.msg);
        setMessageColor('red');
      }
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      setMessage("Failed to verify OTP. Please try again.");
      setMessageColor('red');
    }
  };

  const updatePassword = async () => {
    try {
      const response = await axios.put("http://localhost:5000/user/update-password", {
        phoneNumber: phoneNumber,
        otp: otp,
        newPassword: newPassword
      });

      if (response.data.success) {
        setMessage("Password changed successfully!");
        setMessageColor('green');
      } else {
        setMessage(response.data.msg);
        setMessageColor('red');
      }
    } catch (error) {
      console.error("Failed to change password:", error);
      setMessage("Failed to change password. Please try again.");
      setMessageColor('red');
    }
  };

  return (
    <div className="container">
      <h1 className="title">{t('verifyOTP.VerifyOtph1')}</h1>
      <input
        type="text"
        onChange={handlePhoneNumberChange}
        value={phoneNumber}
        placeholder={t('verifyOTP.numberPlaceholder')}
        className="input"
      />
      <input
        type="text"
        onChange={handleOTPChange}
        value={otp}
        placeholder={t('verifyOTP.enterOTp')}
        className="input"
      />
      <button onClick={verifyOTPmessage} className="button">
        {t('verifyOTP.verifyOtpbutton')}
      </button>
      {isVerified && (
        <div>
          <h2 className="subtitle">{t('verifyOTP.changePassh2')}</h2>
          <input
            type="password"
            onChange={handlePasswordChange}
            value={newPassword}
            placeholder={t('verifyOTP.newpass')}
            className="input"
          />
          <button onClick={updatePassword} className="button">
            {t('verifyOTP.changepassbutton')}
          </button>
        </div>
      )}
      {message && <p className="message" style={{ color: messageColor }}>{message}</p>}
    </div>
  );
};

export default VerifyOTP;
