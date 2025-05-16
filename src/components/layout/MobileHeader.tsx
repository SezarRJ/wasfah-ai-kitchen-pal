
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WasfahLogo } from '../icons/WasfahLogo';
import { Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              className="text-wasfah-deep-teal"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={20} />
            </Button>
          )}
          {showLogo && !title && <WasfahLogo />}
          {title && <h1 className="text-lg font-bold text-wasfah-deep-teal">{title}</h1>}
        </div>
        
        <div className="flex items-center space-x-2">
          {showSearch && (
            <Button
              variant="ghost"
              size="icon"
              className="text-wasfah-deep-teal"
              onClick={() => navigate('/search')}
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
