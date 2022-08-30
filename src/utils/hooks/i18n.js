import { useEffect, useState } from "react";
import en from "../../i18n/en.json";

export const useI18n = (language) => {
  const [content, setContent] = useState(en);

  useEffect(() => {
    let fileName = language ? language : "en"
    let obj = require("../../i18n/"+fileName+".json");    
    setContent(obj)

  }, [language]);

  return [content];
};
