
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WasfahLogo } from '@/components/icons/WasfahLogo';
import { ChefHat } from 'lucide-react';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/auth');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-wasfah-deep-teal flex flex-col items-center justify-center">
      <div className="animate-pulse">
        <WasfahLogo className="text-white w-48 h-48" />
      </div>
      
      <div className="mt-4 flex items-center">
        <ChefHat size={24} className="text-wasfah-bright-teal mr-2" />
        <h1 className="text-2xl font-bold text-white">
          Your AI Kitchen Companion
        </h1>
      </div>
      
      <div className="mt-8 w-16 h-1 bg-wasfah-bright-teal relative">
        <div className="absolute top-0 left-0 h-1 bg-white animate-[loadingBar_2s_ease-in-out]"></div>
      </div>
    </div>
  );
}
