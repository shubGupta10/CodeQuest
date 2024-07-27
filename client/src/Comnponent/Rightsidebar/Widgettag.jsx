import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

function Widgettag() {
    const {t} = useTranslation();

    const currentLanguage = localStorage.getItem('i18nextLng');
    
    useEffect(() => {
        const widgettag = document.querySelectorAll('.widget-tags');
        widgettag.forEach(widget => {
            if (currentLanguage === 'fr') {
                widget.style.color = 'black';
              } else if (currentLanguage === 'en') {
                widget.style.color = 'black';
                document.querySelector('.watchTag').style.color = 'black';
              } else if (currentLanguage === 'hi') {
                widget.style.color = 'white';
              } else if (currentLanguage === 'zh') {
                widget.style.color = 'white';
              } else {
                widget.style.color = 'white';
              }
        })
    },[currentLanguage])

    const tags = [
        "c",
        "css",
        "express",
        "firebase",
        "html",
        "java",
        "javascript",
        "mern",
        "mongodb",
        "mysql",
        "next.js",
        "node.js",
        "php",
        "python",
        "reactjs",
    ]
    return (
    <div className="widget-tags">
        <h4 className='watchTag'>{t('widgeting.watchTg')}</h4>
        <div className="widget-tags-div">
            {tags.map((tag)=>(
                <p key={tag}>{tag}</p>
            ))}
        </div>
    </div>
  )
}

export default Widgettag