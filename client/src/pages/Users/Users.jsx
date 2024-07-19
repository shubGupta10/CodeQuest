import React, { useEffect } from 'react'
import Leftsidebar from '../../Comnponent/Leftsidebar/Leftsidebar'
import './Users.css'
import Userslist from './Userslist'
import { useTranslation } from 'react-i18next'

const Users = ({slidein}) => {
  const {t} = useTranslation();

  const currentLanguage = localStorage.getItem('i18nextLng');

  useEffect(() => {
    const users = document.querySelectorAll('.home-container-1');
    users.forEach(usersPage => {
      if (currentLanguage === 'fr') {
        usersPage.style.color = 'yellow';
      } else if (currentLanguage === 'en-US') {
        usersPage.style.color = 'black';
      } else if (currentLanguage === 'hi') {
        usersPage.style.color = 'white';
      } else if (currentLanguage === 'zh') {
        usersPage.style.color = 'white';
      } else {
        usersPage.style.color = 'black';
      }
    })
  },[currentLanguage])


  useEffect(() => {
    const userProfile = document.querySelectorAll('.user-profile-link h5');
    userProfile.forEach(users => {
      if (currentLanguage === 'fr') {
        users.style.color = 'black';
      } else if (currentLanguage === 'en-US') {
        users.style.color = 'black';
      } else if (currentLanguage === 'hi') {
        users.style.color = 'white';
      } else if (currentLanguage === 'zh') {
        users.style.color = 'white';
      } else {
        users.style.color = 'black';
      }
    })
  },[currentLanguage])

  return (
    <div className="home-container-1">
    <Leftsidebar slidein={slidein}/>
    <div className="home-container-2" style={{marginTop:"30px"}}>
        <h1 style={{fontWeight:"400"}}>{t('users.username')}</h1>
        <Userslist/>
        </div>
        </div>
  )
}

export default Users