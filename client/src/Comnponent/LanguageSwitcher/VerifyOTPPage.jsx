import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './SendOtpPage.css';

const VerifyOtpPage = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();
    const containerRef = useRef(null);

    const phoneNumber = location.state?.phoneNumber;
    const langCode = location.state?.langCode;

    useEffect(() => {
        if (langCode === 'en') {
            i18n.changeLanguage(langCode);
            navigate('/');
        }
    }, [langCode, i18n, navigate]);

    const currentLanguage = localStorage.getItem("i18nextLng");

    //used stack overflow help.
    //used help of chatGpt to solve a error and issue.
    useEffect(() => {
        if (containerRef.current) {
            if (currentLanguage === "fr") {
                containerRef.current.style.backgroundColor = "yellow";
                containerRef.current.style.color = "black";
            } else if (currentLanguage === "en-US") {
                containerRef.current.style.backgroundColor = "white";
                containerRef.current.style.color = "black";
            } else if (currentLanguage === "hi") {
                containerRef.current.style.backgroundColor = "blue";
                containerRef.current.style.color = "white";
            } else if (currentLanguage === "zh") {
                containerRef.current.style.backgroundColor = "green";
                containerRef.current.style.color = "white";
            } else {
                containerRef.current.style.backgroundColor = "white";
                containerRef.current.style.color = "black";
            }
        }
    }, [currentLanguage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/verifying-otp`, {
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
            alert("Language Changed.");
            navigate('/');
            window.location.reload();
        } catch (err) {
            setError(err.message || 'Invalid OTP. Please try again.');
            console.error(err);
            setIsLoading(false);
        }
    };

    if (langCode === 'en') {
        return null;
    }

    return (
        <div className="verifyOtpPage sendOtpPage">
            <div className="container" ref={containerRef}>
                <h2>{t('verifyotppage.h2')}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder={t('verifyotppage.placeholder')}
                        required
                        className="inputField"
                    />
                    <button type="submit" className="submitButton">{isLoading ? <> {t('verifyotppage.verifyingh2')} </> : <> {t('verifyotppage.verifyotpbutton')} </>}</button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default VerifyOtpPage;
