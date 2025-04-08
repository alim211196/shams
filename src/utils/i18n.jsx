import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      blog_title: "Blog Title",
      placeholder_blog_title: "Enter blog title...",
      short_description: "Short Description",
      description: "Description",
      placeholder_description: "Enter description...",
      save: "Save",
    },
  },
  ar: {
    translation: {
      blog_title: "عنوان المدونة",
      placeholder_blog_title: "أدخل عنوان المدونة...",
      short_description: "وصف قصير",
      description: "وصف",
      placeholder_description: "أدخل الوصف...",
      save: "حفظ",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
