import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import enTranslation from './locales/en.json'
import hiTranslation from './locales/hi.json'
import esTranslation from './locales/es.json'
import frTranslation from './locales/fr.json'
import ptTranslation from './locales/pt.json'
import zhTranslation from './locales/zh.json'

//i18n package helps us to create multi language system.
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: enTranslation,
            },
            hi: {
                translation: hiTranslation,
            },
            es: {
                translation: esTranslation,
            },
            fr: {
                translation: frTranslation,
            },
            pt: {
                translation: ptTranslation,
            },
            zh: {
                translation: zhTranslation,
            }
        }
    });

export default i18n;