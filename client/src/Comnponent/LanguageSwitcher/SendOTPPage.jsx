import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SendOtpPage.css';
import { useTranslation } from 'react-i18next';

const SendOtpPage = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const langCode = location.state?.langCode;
    const [isLoading, setIsLoading] = useState(false);
    const {t} = useTranslation();
    

    // Taken little help of ChatGPT in issue and error fixes.
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

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
            // Used help of ChatGPT and ClaudeAI to build intuition for the code.
            navigate('/verifying-otp', { state: { phoneNumber, langCode } });
        } catch (err) {
            setError(err.message || 'Failed to send OTP. Please try again.');
            console.error(err);
            setIsLoading(false);
        }
    };

    return (
        <div className="sendOtpPage">
            <div className="container">
                <h2>{t('sendotppage.h2')}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder={t('sendotppage.placeholder')}
                        required
                        className="inputField"
                    />
                    <button type="submit" className="submitButton" disabled={isLoading}>
                        {isLoading ? <> {t('sendotppage.sendingh2')} </> : <> {t('sendotppage.sendotpbutton')} </>}
                    </button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default SendOtpPage;
