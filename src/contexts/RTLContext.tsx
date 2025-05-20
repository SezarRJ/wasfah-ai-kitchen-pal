
import React, { createContext, useContext, useState, useEffect } from 'react';

interface RTLContextProps {
  isRTL: boolean;
  setRTL: (isRTL: boolean) => void;
  toggleRTL: () => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const RTLContext = createContext<RTLContextProps | undefined>(undefined);

export const RTLProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get initial language from localStorage or default to English
  const [language, setLanguageState] = useState<string>(
    localStorage.getItem('preferredLanguage') || 'en'
  );
  
  // Arabic is RTL
  const [isRTL, setRTLState] = useState<boolean>(language === 'ar');

  useEffect(() => {
    // Apply RTL class to document when language changes
    if (isRTL) {
      document.documentElement.classList.add('rtl');
      document.documentElement.dir = 'rtl';
      document.body.style.textAlign = 'right';
    } else {
      document.documentElement.classList.remove('rtl');
      document.documentElement.dir = 'ltr';
      document.body.style.textAlign = 'left';
    }
  }, [isRTL]);

  const setLanguage = (lang: string) => {
    localStorage.setItem('preferredLanguage', lang);
    setLanguageState(lang);
    setRTLState(lang === 'ar');
  };

  const setRTL = (value: boolean) => {
    setRTLState(value);
  };

  const toggleRTL = () => {
    setRTL(!isRTL);
  };

  return (
    <RTLContext.Provider value={{ isRTL, setRTL, toggleRTL, language, setLanguage }}>
      {children}
    </RTLContext.Provider>
  );
};

export const useRTL = (): RTLContextProps => {
  const context = useContext(RTLContext);
  if (context === undefined) {
    throw new Error('useRTL must be used within a RTLProvider');
  }
  return context;
};
