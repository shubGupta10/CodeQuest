import React, {useEffect} from 'react';
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

  const currentLanguage = localStorage.getItem("i18nextLng");

  useEffect(() => {
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
      if (currentLanguage === "fr") {
        container.style.backgroundColor = "yellow";
      } else if (currentLanguage === "en-US") {
        container.style.backgroundColor = "white";
        container.style.color = "black";
      } else if (currentLanguage === "hi") {
        container.style.backgroundColor = "blue";
        container.style.color = "white";
      } else if (currentLanguage === "zh") {
        container.style.backgroundColor = "green";
        container.style.color = "white";
        document.querySelector('.title').style.color = 'white'
      } else {
        container.style.backgroundColor = "white";
      }
    });
  }, [currentLanguage]);

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
