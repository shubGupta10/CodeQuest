import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SendOtpForm.css'; 

const SendOtpForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        try {
            const response = await axios.post(`${import.meta.env.REACT_APP_BACKEND_URL}/user/send-email-otp`, { email });
            
            if (response.data && response.status === 200) {
                setMessage('OTP sent successfully! Redirecting to verification form...');
                setTimeout(() => {
                    navigate('/verify-email-otp', { state: { email } });
                }, 2000);
            } else {
                setMessage('Failed to send OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            if (error.response) {
                setMessage(`Error: ${error.response.data.message || 'Failed to send OTP'}`);
            } else if (error.request) {
                setMessage('No response from server. Please check your connection.');
            } else {
                setMessage('Error sending OTP. Please try again.');
            }
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="otp-send-form-container">
            <div className="form-wrapper">
                <h2 className="form-title">Send OTP</h2>
                <form onSubmit={handleSubmit} className="otp-form">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-input"
                    />
                    <button type="submit" className="form-button" disabled={loading}>
                        {loading ? 'Sending...' : 'Send OTP'}
                    </button>
                </form>
                {message && <p className="form-message">{message}</p>}
            </div>
        </div>
    );
};

export default SendOtpForm;
