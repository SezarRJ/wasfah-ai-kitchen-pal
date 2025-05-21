
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronRight } from 'lucide-react';
import { WasfahLogo } from '@/components/icons/WasfahLogo';

// Define splash screen content
const splashScreens = [
  {
    title: 'Welcome to Wasfah AI',
    description: 'Discover personalized meal suggestions, AI-powered recipe recommendations, and connect with a community of culinary enthusiasts.',
    image: '/lovable-uploads/ed0ba6f7-c589-46f1-96a9-e69b3990c573.png'
  },
  {
    title: 'Best Desserts',
    description: 'Discover personalized meal suggestions and share your culinary creations with a vibrant community of food enthusiasts.',
    image: '/lovable-uploads/3478e6c6-66b6-44b8-9f16-0426e1989ab2.png'
  },
  {
    title: 'All types of drinks',
    description: 'Discover personalized meal suggestions and connect with our vibrant community to enhance your cooking journey.',
    image: '/lovable-uploads/7ad13e17-a95f-4ed1-9edd-8e0a123d699e.png'
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
      const duration = 3000; // 3 seconds per screen
      
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

  // Safeguard against out-of-bounds index access
  const safeIndex = Math.min(Math.max(0, currentScreen), splashScreens.length - 1);
  const currentSplashScreen = splashScreens[safeIndex];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip button */}
      <div className="w-full flex justify-end p-4">
        <Button 
          variant="ghost" 
          className="text-wasfah-deep-teal hover:bg-wasfah-light-gray"
          onClick={handleSkip}
        >
          Skip
        </Button>
      </div>
      
      {/* Image section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md overflow-hidden rounded-3xl shadow-xl mb-8 border border-gray-200">
          <img 
            src={currentSplashScreen?.image || '/placeholder.svg'} 
            alt={currentSplashScreen?.title || 'Splash screen'} 
            className="w-full h-auto object-cover"
          />
        </div>
        
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-wasfah-deep-teal mb-4">
            {currentSplashScreen?.title || 'Welcome to Wasfah'}
          </h1>
          
          <p className="text-gray-600 text-lg mb-8">
            {currentSplashScreen?.description || 'Discover amazing recipes with our app'}
          </p>
        </div>
      </div>
      
      {/* Navigation and controls */}
      <div className="p-6 w-full max-w-md mx-auto">
        <div className="flex justify-center mb-4">
          {splashScreens.map((_, index) => (
            <div 
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${
                index === currentScreen ? 'bg-wasfah-bright-teal' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <Progress 
          value={progress} 
          className="h-1 mb-6"
        />
        
        <Button
          className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal text-white rounded-full py-6 flex items-center justify-center"
          onClick={handleNext}
        >
          {currentScreen < splashScreens.length - 1 ? (
            <>Next <ChevronRight size={20} className="ml-2" /></>
          ) : (
            'Get Started'
          )}
        </Button>
      </div>
    </div>
  );
}
