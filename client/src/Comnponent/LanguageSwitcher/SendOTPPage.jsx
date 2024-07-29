import React, { useState, useEffect, useRef } from 'react';
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
    const { t } = useTranslation();
    const containerRef = useRef(null);

    const currentLanguage = localStorage.getItem('i18nextLng');

    //got little bit help of ChatGpt in the code.
    useEffect(() => {
        if (containerRef.current) {
            if (currentLanguage === 'fr') {
                containerRef.current.style.backgroundColor = 'yellow';
                containerRef.current.style.color = 'black';
            } else if (currentLanguage === 'en-US') {
                containerRef.current.style.backgroundColor = 'white';
                containerRef.current.style.color = 'black';
            } else if (currentLanguage === 'hi') {
                containerRef.current.style.backgroundColor = 'blue';
                containerRef.current.style.color = 'white';
            } else if (currentLanguage === 'zh') {
                containerRef.current.style.backgroundColor = 'green';
                containerRef.current.style.color = 'white';
            } else {
                containerRef.current.style.backgroundColor = 'white';
            }
        }
    }, [currentLanguage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/sending-otp`, {
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

            navigate('/verifying-otp', { state: { phoneNumber, langCode } });
        } catch (err) {
            setError(err.message || 'Failed to send OTP. Please try again.');
            console.error(err);
            setIsLoading(false);
        }
    };


    useEffect (() => {
        const sendotp = document.querySelectorAll('.sendOtpPage');
        sendotp.forEach(sendotps => {
            if (currentLanguage === 'fr') {
                sendotps.style.color = 'black';
              } else if (currentLanguage === 'en-US') {
                sendotps.style.color = 'black';
              } else if (currentLanguage === 'hi') {
                sendotps.style.color = 'white';
              } else if (currentLanguage === 'zh') {
                sendotps.style.color = 'white';
              } else {
                sendotps.style.color = 'black';
              }
        })
    },[currentLanguage])

    return (
        <div className="sendOtpPage">
            <div className="container" ref={containerRef}>
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
