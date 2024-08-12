import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from './de/de.json';
import en from './en/en.json';

const resources = {
  en: {
    home: en,
  },
  de: {
    home: de,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: 'en',
  debug: false,
  fallbackLng: 'en',
  saveMissing: true,
});

export default i18next;
