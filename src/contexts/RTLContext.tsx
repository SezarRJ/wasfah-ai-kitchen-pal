
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface RTLContextProps {
  isRTL: boolean;
  setRTL: (isRTL: boolean) => void;
  toggleRTL: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  direction: 'ltr' | 'rtl';
}

const RTLContext = createContext<RTLContextProps | undefined>(undefined);

export const RTLProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
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
    
    // Apply language attribute for screen readers
    document.documentElement.lang = language;
  }, [isRTL, language]);

  const setLanguage = (lang: string) => {
    try {
      localStorage.setItem('preferredLanguage', lang);
      setLanguageState(lang);
      const newIsRTL = lang === 'ar';
      setRTLState(newIsRTL);
      
      toast({
        title: newIsRTL ? "تم تغيير اللغة" : "Language Changed",
        description: newIsRTL ? 
          "تم تغيير لغة التطبيق إلى العربية" : 
          `The application language has been changed to ${lang === 'en' ? 'English' : lang}`
      });
    } catch (error) {
      console.error('Error setting language:', error);
    }
  };

  const setRTL = (value: boolean) => {
    setRTLState(value);
  };

  const toggleRTL = () => {
    setRTL(!isRTL);
    setLanguage(isRTL ? 'en' : 'ar');
  };

  return (
    <RTLContext.Provider value={{ 
      isRTL, 
      setRTL, 
      toggleRTL, 
      language, 
      setLanguage,
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
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
