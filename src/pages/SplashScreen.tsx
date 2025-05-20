
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WasfahLogo } from '@/components/icons/WasfahLogo';
import { ChefHat, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface SplashScreenContent {
  title: string;
  description: string;
  image?: string;
}

const splashScreens: SplashScreenContent[] = [
  {
    title: 'Welcome to WasfahAI',
    description: 'Your AI-powered kitchen companion for discovering and cooking amazing recipes.'
  },
  {
    title: 'Personalized Recipes',
    description: 'Get recipe recommendations based on your dietary preferences, available ingredients, and skill level.'
  },
  {
    title: 'Join Our Community',
    description: 'Connect with other food lovers, share recipes, and get inspired by culinary creations from around the world.'
  }
];

export default function SplashScreen() {
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState(0);
  const [progress, setProgress] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (autoAdvance) {
      // Start progress animation
      const startTime = Date.now();
      const duration = 2000; // 2 seconds per screen
      
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min(100, (elapsed / duration) * 100);
        setProgress(newProgress);
        
        if (newProgress < 100) {
          requestAnimationFrame(updateProgress);
        } else {
          // Move to next screen or navigate to auth
          if (currentScreen < splashScreens.length - 1) {
            setCurrentScreen(prev => prev + 1);
            setProgress(0);
          } else {
            navigate('/auth');
          }
        }
      };
      
      requestAnimationFrame(updateProgress);
      
      return () => {
        cancelAnimationFrame(requestAnimationFrame(updateProgress));
        if (timer) clearTimeout(timer);
      };
    }
  }, [currentScreen, navigate, autoAdvance]);

  const handleNext = () => {
    if (currentScreen < splashScreens.length - 1) {
      setCurrentScreen(prev => prev + 1);
      setProgress(0);
    } else {
      navigate('/auth');
    }
    setAutoAdvance(false);
  };

  const handleSkip = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-wasfah-deep-teal to-wasfah-bright-teal flex flex-col items-center justify-between px-6 py-10">
      <div className="w-full flex justify-end">
        <Button 
          variant="ghost" 
          className="text-white hover:bg-white/10"
          onClick={handleSkip}
        >
          Skip
        </Button>
      </div>
      
      <div className="flex flex-col items-center justify-center flex-1 text-center">
        <div className="animate-pulse mb-8">
          <WasfahLogo className="text-white w-32 h-32" />
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <ChefHat size={28} className="text-wasfah-bright-teal mr-2" />
            <h1 className="text-3xl font-bold text-white">
              {splashScreens[currentScreen].title}
            </h1>
          </div>
          
          <p className="mt-4 text-lg text-white/90 max-w-sm">
            {splashScreens[currentScreen].description}
          </p>
        </div>
      </div>
      
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-4">
          {splashScreens.map((_, index) => (
            <div 
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${
                index === currentScreen ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
        
        <Progress 
          value={progress} 
          className="h-1 mb-6 bg-white/20" 
          indicatorClassName="bg-white" 
        />
        
        <Button
          className="w-full bg-white text-wasfah-deep-teal hover:bg-white/90 flex items-center justify-center"
          onClick={handleNext}
        >
          {currentScreen < splashScreens.length - 1 ? (
            <>Next <ArrowRight size={18} className="ml-2" /></>
          ) : (
            'Get Started'
          )}
        </Button>
      </div>
    </div>
  );
}
