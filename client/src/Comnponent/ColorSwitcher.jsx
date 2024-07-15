import React, { useEffect } from 'react';

const ColorSwitcher = ({ children }) => {
  const currentLanguage = localStorage.getItem('i18nextLng');

  useEffect(() => {
    if (currentLanguage === 'fr') {
      document.body.style.backgroundColor = 'yellow';
    } else if (currentLanguage === 'hi') {
      document.body.style.backgroundColor = 'blue';
    } else if (currentLanguage === 'zh') {
      document.body.style.backgroundColor = 'green';
    } else {
      document.body.style.backgroundColor = 'white';
    }
  }, [currentLanguage]);

  return <>{children}</>;
};

export default ColorSwitcher;
