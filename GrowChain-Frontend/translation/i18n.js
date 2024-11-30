import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslations from "./en.json";
import hiTranslations from "./hi.json";

i18n
  .use(LanguageDetector) 
  .use(initReactI18next) 
  .init({
    resources: {
      en: { translation: enTranslations },
      hi: { translation: hiTranslations },
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

  console.log('i18n initialized:', i18n); // Add this in `i18n.js`


export default i18n;
