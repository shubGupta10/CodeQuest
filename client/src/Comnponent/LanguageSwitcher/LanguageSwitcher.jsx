import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaGlobe } from 'react-icons/fa';
import "./LanguageSwitcher.css"

const LanguageSwitcher  = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'Hindi' }
    ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const changeLanguage = (langCode) => {
        i18n.changeLanguage(langCode);
        setIsOpen(false);
    };

    return (
        <div className="languageSwitcher">
            <button onClick={toggleDropdown} className="globeButton">
                <FaGlobe />
            </button>
            {isOpen && (
                <ul className="languageDropdown">
                    {languages.map((lang) => (
                        <li key={lang.code}>
                            <button onClick={() => changeLanguage(lang.code)}>
                                {lang.name}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default LanguageSwitcher;
