import React, {useEffect} from 'react'
import './Leftsidebar.css'
import { NavLink } from 'react-router-dom'
import Globe from "../../assets/Globe.svg"
import { useTranslation } from 'react-i18next'


const Leftsidebar = ({ slidein }) => {

  const currentLanguage = localStorage.getItem('i18nextLng');

  useEffect(() => {
      if (currentLanguage === 'fr') {
          document.body.style.backgroundColor = 'yellow';
        } else if (currentLanguage === 'hi') {
          document.body.style.backgroundColor = 'blue';
          document.body.style.color = 'white'
        } else if (currentLanguage === 'zh') {
          document.body.style.backgroundColor = 'green';
          document.body.style.color = 'white'
        } else {
          document.body.style.backgroundColor = 'white';
        }
      }, [currentLanguage]);

  const {t} = useTranslation();

  const slideinstyle = {
    transform: "translateX(0%)",
  };
  const slideoutstyle = {
    transform: "translateX(-100%)",
  }
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
            <p>{t('leftsidebar.publictext')}</p>
          </div>
          <button className='nav-btnn'>
            <NavLink to='/Question' className='side-nav-links' activeclassname='active'>
            <img src={Globe} alt="globe" />
            <p style={{paddingLeft:'10px'}}>{t('leftsidebar.questiontext')}</p>
            </NavLink>
          </button>
          <button className='nav-btnn'>
            <NavLink to='/Tags' className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
            <p >{t('leftsidebar.tagstext')}</p>
            </NavLink>
          </button>
          <button className='nav-btnn'>
            <NavLink to='/Users' className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
            <p >{t('leftsidebar.userstext')}</p>
            </NavLink>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Leftsidebar