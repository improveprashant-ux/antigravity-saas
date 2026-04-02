import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const languages = {
  HINGLISH: 'hinglish',
  ENGLISH: 'english',
  HINDI: 'hindi'
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(languages.HINGLISH);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
