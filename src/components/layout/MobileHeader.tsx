
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WasfahLogo } from '../icons/WasfahLogo';
import { Search, ArrowLeft, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MobileHeaderProps {
  title?: string;
  showBackButton?: boolean;
  showSearch?: boolean;
  showLogo?: boolean;
  actions?: React.ReactNode;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  showBackButton = false,
  showSearch = false,
  showLogo = true,
  actions,
}) => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleSearchClick = () => {
    navigate('/search');
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    // Here you would implement actual language change logic
    console.log(`Language changed to: ${language}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              className="text-wasfah-deep-teal"
              onClick={() => {
                // Navigate to the parent page or home if on main feature
                const path = window.location.pathname;
                const isMainPage = [
                  '/find-by-ingredients', 
                  '/global-cuisine', 
                  '/meal-plan',
                  '/chef-avatar',
                  '/health-tracking-home',
                  '/pantry',
                  '/shared-recipes-tracking',
                  '/favorites'
                ].includes(path);
                
                if (isMainPage) {
                  navigate('/');
                } else {
                  navigate(-1);
                }
              }}
            >
              <ArrowLeft size={20} />
            </Button>
          )}
          {showLogo && !title && <WasfahLogo />}
          {title && <h1 className="text-lg font-bold text-wasfah-deep-teal">{title}</h1>}
        </div>
        
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-wasfah-deep-teal"
              >
                <Languages size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg">
              <DropdownMenuItem 
                className={selectedLanguage === "English" ? "bg-gray-100" : ""}
                onClick={() => handleLanguageChange("English")}
              >
                🇺🇸 English
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={selectedLanguage === "Arabic" ? "bg-gray-100" : ""}
                onClick={() => handleLanguageChange("Arabic")}
              >
                🇦🇪 العربية
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={selectedLanguage === "Spanish" ? "bg-gray-100" : ""}
                onClick={() => handleLanguageChange("Spanish")}
              >
                🇪🇸 Español
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={selectedLanguage === "French" ? "bg-gray-100" : ""}
                onClick={() => handleLanguageChange("French")}
              >
                🇫🇷 Français
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {showSearch && (
            <Button
              variant="ghost"
              size="icon"
              className="text-wasfah-deep-teal"
              onClick={handleSearchClick}
            >
              <Search size={20} />
            </Button>
          )}
          {actions}
        </div>
      </div>
    </header>
  );
};
