import { useEffect, useState } from "react";
import en from "../../i18n/en.json";

export const useI18n = (language) => {
  const [content, setContent] = useState(en);
  const [currentLanguage, setCurrentLanguage] = useState(language)

  useEffect(() => {
    let fileName = currentLanguage ? currentLanguage : "en"
    let obj = require("../../i18n/"+fileName+".json");    
    setContent(obj)

  }, [language, currentLanguage]);

  return [content, currentLanguage, setCurrentLanguage];
};
