import React, { useState } from 'react';
import './VerifyOTP.css';
import axios from 'axios';

const VerifyOTP = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const verifyOTPmessage = async () => {
    try {
      const response = await axios.post("http://localhost:5000/user/verify-otp", {
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
      <h1 className="title">Verify OTP and Change Password</h1>
      <input
        type="text"
        onChange={handlePhoneNumberChange}
        value={phoneNumber}
        placeholder="Please your phone number again!"
        className="input"
      />
      <input
        type="text"
        onChange={handleOTPChange}
        value={otp}
        placeholder="Enter the OTP"
        className="input"
      />
      <button onClick={verifyOTPmessage} className="button">
        Verify OTP
      </button>
      {isVerified && (
        <div>
          <h2 className="subtitle">Change Password</h2>
          <input
            type="password"
            onChange={handlePasswordChange}
            value={newPassword}
            placeholder="Enter new password"
            className="input"
          />
          <button onClick={updatePassword} className="button">
            Change Password
          </button>
        </div>
      )}
      {message && <p className="message" style={{ color: messageColor }}>{message}</p>}
    </div>
  );
};

export default VerifyOTP;
