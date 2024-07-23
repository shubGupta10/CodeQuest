import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './VerifyOtpForm.css'; // Import the CSS file

const VerifyOtpForm = () => {
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.email) {
            setEmail(location.state.email);
        } else {
            setMessage('Email not found. Please go back and resend OTP.');
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/user/verify-email-otp', { email, otp });
            
            if (response.data && response.status === 200) {
                setMessage('OTP verified successfully! Redirecting...');
                setTimeout(() => navigate('/'), 2000);
            } else {
                setMessage('OTP verification failed. Please try again.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            if (error.response) {
                setMessage(`Error: ${error.response.data.message || 'OTP verification failed'}`);
            } else if (error.request) {
                setMessage('No response from server. Please check your connection.');
            } else {
                setMessage('Error verifying OTP. Please try again.');
            }
        }
    };

    return (
        <div className="otp-verify-form-container">
            <div className="form-wrapper">
                <h2 className="form-title">Verify OTP</h2>
                <form onSubmit={handleSubmit} className="otp-form">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        readOnly
                        className="form-input"
                    />
                    <label htmlFor="otp" className="form-label">OTP</label>
                    <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        className="form-input"
                    />
                    <button type="submit" className="form-button">Verify OTP</button>
                </form>
                {message && <p className="form-message">{message}</p>}
            </div>
        </div>
    );
};

export default VerifyOtpForm;
