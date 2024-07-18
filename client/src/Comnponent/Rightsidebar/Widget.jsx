import React, { useEffect } from "react";
import "./Rightsidebar.css";
import comment from "../../assets/comment-alt-solid.svg";
import pen from "../../assets/pen-solid.svg";
import blackLogo from "../../assets/blacklogo.svg";
import { useTranslation } from "react-i18next";

const Widget = () => {
  const { t } = useTranslation();

  const currentLanguage = localStorage.getItem('i18nextLng');

  useEffect(() => {
    const Allwidget = document.querySelectorAll('.widget');
    Allwidget.forEach(widget => {
      if (currentLanguage === 'fr') {
        widget.style.color = 'black';
      } else if (currentLanguage === 'en-US') {
        widget.style.color = 'black';
      } else if (currentLanguage === 'hi') {
        widget.style.color = 'white';
      } else if (currentLanguage === 'zh') {
        widget.style.color = 'white';
      } else {
        widget.style.color = 'black';
      }
    })
  },[currentLanguage])

  return (
    <div className="widget">
      <h4>{t('Rightsidebar.title')}</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <img src={pen} alt="pen" width="18" />
          <p>{t('Rightsidebar.observatorytext')}</p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={pen} alt="pen" width="18" />
          <p>{t('Rightsidebar.podcasetext')}</p>
        </div>
      </div>
      <h4>{t('Rightsidebar.featuredonmeta')}</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <img src={comment} alt="pen" width="18" />
          <p>{t('Rightsidebar.reviewqueue')}</p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={comment} alt="pen" width="18" />
          <p>{t('Rightsidebar.pentext')}</p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={blackLogo} alt="pen" width="18" />
          <p>{t('Rightsidebar.pensecondtext')}</p>
        </div>
      </div>
      <h4>{t('Rightsidebar.hotmetapots')}</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <p>38</p>
          <p>{t('Rightsidebar.whythisspam')}</p>
        </div>
        <div className="right-sidebar-div-2">
          <p>20</p>
          <p>{t('Rightsidebar.bestcourse')}</p>
        </div>
        <div className="right-sidebar-div-2">
          <p>14</p>
          <p>{t('Rightsidebar.howtoask')}</p>
        </div>
      </div>
    </div>
  );
};

export default Widget;
