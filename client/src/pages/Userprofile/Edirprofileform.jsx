import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateprofile } from '../../action/users'
import './Userprofile.css'
import {useTranslation} from 'react-i18next'

const Edirprofileform = ({ currentuser, setswitch }) => {
  const [name, setname] = useState(currentuser?.result?.name)
  const [about, setabout] = useState(currentuser?.result?.about)
  const [tags, settags] = useState([])
  const {t} = useTranslation();

  const dispatch=useDispatch()

  const handlesubmit = (e) => {
    e.preventDefault()
    if (tags[0] === '' || tags.length === 0) {
      alert("update tags field")
    }else{
      dispatch(updateprofile(currentuser?.result?._id,{name,about,tags}))
    }
    setswitch(false)
  }


  const currentLanguage = localStorage.getItem('i18nextLng');
  useEffect(() => {
    if(currentLanguage === 'fr'){
      document.querySelector('.edit-profile-title-2').style.color = 'black'
    }else if(currentLanguage === 'hi'){
      document.querySelector('.edit-profile-title-2').style.color = 'white'
    } else if(currentLanguage === 'zh'){
      document.querySelector('.edit-profile-title-2').style.color = 'white'
    }else{
      document.querySelector('.edit-profile-title-2').style.color = 'black'
    }
    
  },[currentLanguage])

  return (
    <div>
      <h1 className="edit-profile-title">{t('editprofilePage.editprofileTitle')}</h1>
      <h2 className='edit-profile-title-2'>{t('editprofilePage.publicInfo')}</h2>
      <form className="edit-profile-form" onSubmit={handlesubmit}>
        <label htmlFor="name">
          <h3>{t('editprofilePage.name')}</h3>
          <input type="text" value={name} onChange={(e) => setname(e.target.value)} />
        </label>
        <label htmlFor="about">
          <h3>{t('editprofilePage.aboutme')}</h3>
          <textarea name="" id="about" cols="30" rows="10" value={about} onChange={(e) => setabout(e.target.value)}></textarea>
        </label>
        <label htmlFor="tags">
          <h3>{t('editprofilePage.watchedtgs')}</h3>
          <p>{t('editprofilePage.addtagstext')}</p>
          <input
            type="text"
            id="tags"
            onChange={(e) => settags(e.target.value.split(" "))}
          />
        </label>
        <br />
        <input type="submit" value={t('editprofilePage.savebutton')} className='user-submit-btn' />
        <button type='button' className='user-cancel-btn' onClick={() => setswitch(false)}>{t('editprofilePage.cancelbutton')}</button>
      </form>
    </div>
  )
}

export default Edirprofileform