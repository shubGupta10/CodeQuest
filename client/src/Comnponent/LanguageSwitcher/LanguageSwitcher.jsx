import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaGlobe } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import "./LanguageSwitcher.css";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'Hindi' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'zh', name: 'Chinese' }
    ];



    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const initiateLanguageChange = (langCode) => {
        if (langCode === 'en') {
            i18n.changeLanguage(langCode).then(() => {
                window.location.reload();
            });
            setIsOpen(false);
        } else {
            navigate('/sending-otp', { state: { langCode } });
            setIsOpen(false);
        }
    };
    


    return (
        <div className="languageSwitcher">
            <button onClick={toggleDropdown} className="globeButton">
                <FaGlobe  />
            </button>
            {isOpen && (
                <ul className="languageDropdown">
                    {languages.map((lang) => (
                        <li key={lang.code} className="languageOption">
                            <button onClick={() => initiateLanguageChange(lang.code)}>
                                {lang.name}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LanguageSwitcher;