import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ColorSwitcher = ({ children }) => {
  const { i18n } = useTranslation();
  const [bgColor, setBgColor] = useState('white');

  useEffect(() => {
    const currentLanguage = i18n.language;
    let color = 'white';

    if (currentLanguage === 'fr') {
      color = 'yellow';
    } else if (currentLanguage === 'hi') {
      color = 'blue';
    } else if (currentLanguage === 'zh') {
      color = 'green';
    }

    setBgColor(color);
    document.documentElement.style.setProperty('--bg-color', color);
  }, [i18n.language]);

  return (
    <div style={{ backgroundColor: bgColor, minHeight: '100vh' }}>
      {children}
    </div>
  );
};

export default ColorSwitcher;