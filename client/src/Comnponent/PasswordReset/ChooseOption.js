import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ChooseOption.css';

const ChooseOption = () => {
  const navigate = useNavigate();

  const emailSelect = () => {
    navigate("/password-reset");
  }

  const phoneSelect = () => {
    navigate("/send-otp");
  }

  return (
    <div className="container">
      <h1 className="title">Choose your option</h1>
      <button
        className="button"
        onClick={emailSelect}
      >
        Email
      </button>
      <button
        className="button"
        onClick={phoneSelect}
      >
        Phone Number
      </button>
    </div>
  );
};

export default ChooseOption;
