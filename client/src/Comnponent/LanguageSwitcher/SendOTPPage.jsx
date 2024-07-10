import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SendOtpPage.css';

const SendOtpPage = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const langCode = location.state?.langCode;

    //taken little help of chatGpt in issue and error fixes.
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5000/user/sending-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || 'Failed to send OTP');
            }
            //used help of chatgpt and claudeAi to build initution for the code
            navigate('/verifying-otp', { state: { phoneNumber, langCode } });
        } catch (err) {
            setError(err.message || 'Failed to send OTP. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="sendOtpPage">
            <div className="container">
                <h2>Send OTP to Change Language</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter phone number"
                        required
                        className="inputField"
                    />
                    <button type="submit" className="submitButton">Send OTP</button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default SendOtpPage;
