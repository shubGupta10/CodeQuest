import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './SendOtpPage.css';

const VerifyOtpPage = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { i18n } = useTranslation();

    const phoneNumber = location.state?.phoneNumber;
    const langCode = location.state?.langCode;

    useEffect(() => {
        if (langCode === 'en') {
            i18n.changeLanguage(langCode);
            navigate('/');
        }
    }, [langCode, i18n, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5000/user/verifying-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber, otp, langCode }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || 'Invalid OTP');
            }

            i18n.changeLanguage(langCode);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Invalid OTP. Please try again.');
            console.error(err);
        }
    };

    if (langCode === 'en') {
        return null;
    }

    return (
        <div className="verifyOtpPage sendOtpPage">
            <div className="container">
                <h2>Verify OTP to Change Language</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        required
                        className="inputField"
                    />
                    <button type="submit" className="submitButton">Verify OTP</button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default VerifyOtpPage;
