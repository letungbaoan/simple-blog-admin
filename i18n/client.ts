import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enCommon from '@/public/locales/en/common.json'
import enAuth from '@/public/locales/en/auth.json'
import viCommon from '@/public/locales/vi/common.json'
import viAuth from '@/public/locales/vi/auth.json'

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { common: enCommon, auth: enAuth },
      vi: { common: viCommon, auth: viAuth }
    },
    fallbackLng: 'en',
    lng: 'en',
    ns: ['common', 'auth'],
    defaultNS: 'common',
    interpolation: { escapeValue: false }
  })
}

export default i18n
