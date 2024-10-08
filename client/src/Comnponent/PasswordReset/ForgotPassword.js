import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { id, token } = useParams();
  const [password, setPassword] = useState('');

  const userValid = async () => {
    try {
      const response = await axios.get(`https://codequest-emf6.onrender.com/user/forgotpassword/${id}/${token}`);
      const { status } = response.data;
      console.log(response.data);
      if (status === 201) {
        console.log('User valid');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error validating user:', error);
      navigate('/error');
    }
  };

  useEffect(() => {
    userValid();
  }, []);


  const currentLanguage = localStorage.getItem("i18nextLng");

  useEffect(() => {
    if (currentLanguage === "fr") {
      document.body.style.backgroundColor = "yellow";
    } else if (currentLanguage === "en-US") {
      document.body.style.color = "black";
    } else if (currentLanguage === "hi") {
      document.body.style.backgroundColor = "blue";
      document.body.style.color = "white";
    } else if (currentLanguage === "zh") {
      document.body.style.backgroundColor = "green";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
    }
  }, [currentLanguage]);

  //used an little help of web to look about Params

  const sendPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://codequest-emf6.onrender.com/user/${id}/${token}`,
        { password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { status } = response.data;

      if (status === 201) {
        setPassword('');
        console.log('Password reset successfully');
        alert("Password reset successfully")
        navigate("/");
      } else {
        alert("Failed to reset the password, Please try again");
        console.log('User not found or failed to reset password');
      }
    } catch (error) {
      alert("Caught some error, Please try again!");
      console.error('Error resetting password:', error.response?.data || error.message);
    }
  };

  const setValue = (e) => {
    setPassword(e.target.value);
  };

  return (
    <section className="auth-section">
      <div className="auth-container">
        <h1>Enter Your New Password</h1>
        <form onSubmit={sendPassword}>
          <input
            type="password"
            value={password}
            onChange={setValue}
            placeholder="Enter your new password here"
            className="auth-input"
            required
          />
          <button type="submit" className="auth-btn">
            Reset your Password
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
