import React, { useEffect } from 'react';

const Taglist = ({ tag }) => {
  const currentLanguage = localStorage.getItem('i18nextLng');

  useEffect(() => {
    const tags = document.querySelectorAll('.tag');
    tags.forEach((TagElement) => {
      if (currentLanguage === 'fr') {
        TagElement.style.color = 'black';
      } else if (currentLanguage === 'en-US') {
        TagElement.style.color = 'black';
      } else if (currentLanguage === 'hi') {
        TagElement.style.color = 'white';
      } else if (currentLanguage === 'zh') {
        TagElement.style.color = 'white';
      } else {
        TagElement.style.color = 'white';
      }
    });
  }, [currentLanguage]);

  return (
    <div className="tag">
      <h5>{tag.tagName}</h5>
      <p>{tag.tagDesc}</p>
    </div>
  );
};

export default Taglist;
