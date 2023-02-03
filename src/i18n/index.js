import { format as formatDate } from 'date-fns';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './resources/en';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  supportedLngs: ['en'],
  resources: {
    en: {
      translation: enTranslations,
    },
  },
  interpolation: {
    format: (value, format) => {
      if (value instanceof Date) {
        return formatDate(value, format);
      }

      return value;
    },
  },
});

export default i18n;
