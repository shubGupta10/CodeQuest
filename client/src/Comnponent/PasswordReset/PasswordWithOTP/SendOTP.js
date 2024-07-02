import React, { useState } from 'react';
import './SendOTP.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SendOTP = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const navigate = useNavigate();

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
      setMessage("Failed to send OTP. Please try again later.");
      setMessageColor('red'); 
    }
  };

  return (
    <div className="container">
      <h1 className="title">Enter Phone Number for OTP</h1>
      <p className="subtitle">Please enter your phone number including the country code (e.g., +91 for India)</p>
      <input
        type="text"
        placeholder="E.g., +911234567890"
        className="input"
        value={phoneNumber}
        onChange={handleChange}
      />
      <button onClick={clicktoSend} className="button">
        Send OTP
      </button>
      {message && <p className="message" style={{ color: messageColor }}>{message}</p>}
    </div>
  );
};

export default SendOTP;
