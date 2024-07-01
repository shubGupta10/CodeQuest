import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { id, token } = useParams();
  const [password, setPassword] = useState('');

  const userValid = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/forgotpassword/${id}/${token}`);
      const { status } = response.data;

      if (status === 201) {
        console.log('User valid');
      } else {
        navigate('/user-not-valid');
      }
    } catch (error) {
      console.error('Error validating user:', error);
      navigate('/error');
    }
  };

  useEffect(() => {
    userValid();
  }, []);

  const sendPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/user/${id}/${token}`,
        { password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { status } = response.data;

      if (status === 201) {
        setPassword('');
        console.log('Password reset successfully');
      } else {
        console.log('User not found or failed to reset password');
      }
    } catch (error) {
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
