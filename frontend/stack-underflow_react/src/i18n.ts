import i18n from "i18next";
import { initReactI18next } from "../node_modules/react-i18next";
import LanguageDetector from "i18next-browser-languagedetector/cjs";

import en from "./locales/en.json";
import id from "./locales/id.json";

const resources = {
  en: {
    translation: en,
  },
  id: {
    translation: id,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    lng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
