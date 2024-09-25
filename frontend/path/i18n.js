// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      en: {
        translation: require('../locales/en.json'),
      },
      ru: {
        translation: require('../locales/ru.json'),
      },
      hi: {
        translation: require('../locales/hi.json'),
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
