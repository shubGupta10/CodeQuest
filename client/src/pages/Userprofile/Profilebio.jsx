import React from 'react'
import { useTranslation } from 'react-i18next'

const Profilebio = ({currentprofile}) => {

  const {t} = useTranslation();

  return (
    <div>
      <div>
        {currentprofile?.tags.length !==0? (
          <>
          <h4>{t('profilebio.Tagswatch')}</h4>
          {currentprofile?.tags.map((tag)=>(
            <p key={tag}>{tag}</p>
          ))}
          </>
        ):(
          <p>{t('profilebio.tagswatched')}</p>
        )}
      </div>
      <div>{currentprofile?.about ? (
        <> 
        <h4>{t('profilebio.abouth4')}</h4>
        <p>{currentprofile?.about}</p>
        </>
      ):(
        <p>{t('profilebio.nobio')}</p>
      )}</div>
    </div>
  )
}

export default Profilebio