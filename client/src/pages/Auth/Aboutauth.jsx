import React from 'react'
import { useTranslation } from 'react-i18next'

const Aboutauth = () => {
  const {t} = useTranslation();
  return (
    <div className="auth-container-1">
      <h1>{t('auth.joinCommunity')}</h1>
      <p>{t('auth.askQuestion')}</p>
      <p>{t('auth.unlockPrivileges')}</p>
      <p>{t('auth.saveFavorites')}</p>
      <p>{t('auth.earnReputation')}</p>
      <p style={{ fontSize: "13px", color: "#666767" }}>
      {t('auth.collaborate')}
      </p>
      <p style={{ fontSize: "13px", color: "#007ac6" }}>
      {t('auth.teamfree')}
      </p>
    </div>
  )
}

export default Aboutauth