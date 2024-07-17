import React, { useEffect } from 'react';
import './Leftsidebar.css';
import { NavLink } from 'react-router-dom';
import Globe from "../../assets/Globe.svg";
import { useTranslation } from 'react-i18next';

const Leftsidebar = ({ slidein }) => {
  const currentLanguage = localStorage.getItem('i18nextLng');

  useEffect(() => {
    const sidenav = document.querySelectorAll('.side-nav-links');
    sidenav.forEach(sidenavdiv => {
      if (currentLanguage === 'fr') {
        sidenavdiv.style.backgroundColor = 'yellow';
        sidenavdiv.style.color = 'black';
      } else if (currentLanguage === 'hi') {
        sidenavdiv.style.backgroundColor = 'blue';
        sidenavdiv.style.color = 'white';
      } else if (currentLanguage === 'zh') {
        sidenavdiv.style.backgroundColor = 'green';
        sidenavdiv.style.color = 'white';
      } else {
        sidenavdiv.style.backgroundColor = 'white';
        sidenavdiv.style.color = 'black'; 
      }
    });
  }, [currentLanguage]);

  useEffect(() => {
    const publicText = document.querySelector('.public');
    if(currentLanguage === 'fr'){
      publicText.style.color = 'black'
    } else if(currentLanguage === 'hi'){
      publicText.style.color = 'white';
    } else if(currentLanguage === 'zh'){
      publicText.style.color = 'black';
    }else {
      publicText.style.color = 'black';
    }
  },[currentLanguage])

  const { t } = useTranslation();

  const slideinstyle = {
    transform: "translateX(0%)",
  };
  const slideoutstyle = {
    transform: "translateX(-100%)",
  };

  return (
    <div className="left-sidebar" style={slidein ? slideinstyle : slideoutstyle}>
      <nav className='side-nav'>
        <button className="nav-btnn">
          <NavLink to='/' className="side-nav-links" activeclassname='active'>
            <p>{t('leftsidebar.hometext')}</p>
          </NavLink>
        </button>
        <div className="side-nav-div">
          <div>
            <p className='public'>{t('leftsidebar.publictext')}</p>
          </div>
          <button className='nav-btnn'>
            <NavLink to='/Question' className='side-nav-links' activeclassname='active'>
              <img src={Globe} alt="globe" />
              <p style={{ paddingLeft: '10px' }}>{t('leftsidebar.questiontext')}</p>
            </NavLink>
          </button>
          <button className='nav-btnn'>
            <NavLink to='/Tags' className='side-nav-links' activeclassname='active' style={{ paddingLeft: "40px" }}>
              <p>{t('leftsidebar.tagstext')}</p>
            </NavLink>
          </button>
          <button className='nav-btnn'>
            <NavLink to='/Users' className='side-nav-links' activeclassname='active' style={{ paddingLeft: "40px" }}>
              <p>{t('leftsidebar.userstext')}</p>
            </NavLink>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Leftsidebar;
