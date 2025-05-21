
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Activity, Heart, Globe, Calendar, ShoppingCart, Share2, Users, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TodayMealPlan } from '@/components/home/TodayMealPlan';
import { ExpiringIngredients } from '@/components/home/ExpiringIngredients';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const header = {
    showLogo: true,
    showSearch: true,
    actions: null,
  };

  const mainFeatures = [
    { 
      icon: <Search className="h-6 w-6 text-white" />, 
      label: "Find by Ingredients", 
      path: "/find-by-ingredients",
      color: "bg-wasfah-bright-teal",
    },
    { 
      icon: <Globe className="h-6 w-6 text-white" />, 
      label: "Global Cuisine", 
      path: "/global-cuisine",
      color: "bg-wasfah-deep-teal",
    },
    { 
      icon: <Calendar className="h-6 w-6 text-white" />, 
      label: "Meal Plan", 
      path: "/meal-plan",
      color: "bg-green-500",
    },
    { 
      icon: <Camera className="h-6 w-6 text-white" />, 
      label: "Scan Dish", 
      path: "/scan-ingredients",
      color: "bg-amber-500",
    },
    { 
      icon: <Activity className="h-6 w-6 text-white" />, 
      label: "Health Tracking", 
      path: "/health-tracking-home",
      color: "bg-wasfah-coral-red",
    },
    { 
      icon: <ShoppingCart className="h-6 w-6 text-white" />, 
      label: "Pantry", 
      path: "/pantry",
      color: "bg-purple-500",
    },
    { 
      icon: <Users className="h-6 w-6 text-white" />, 
      label: "Community", 
      path: "/community",
      color: "bg-blue-500",
    },
    { 
      icon: <Heart className="h-6 w-6 text-white" />, 
      label: "Favorites", 
      path: "/favorites",
      color: "bg-pink-500",
    },
  ];

  return (
    <PageContainer header={header}>
      <div className="space-y-6 pb-24">
        {/* Hero Section */}
        <Card className="bg-gradient-to-r from-wasfah-deep-teal to-wasfah-bright-teal text-white overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold mb-2">Wasfah AI</h1>
              <p className="text-sm opacity-90 mb-4">Your AI-powered kitchen companion</p>
              <Link to="/scan-ingredients" className="inline-block">
                <Button className="bg-white text-wasfah-bright-teal hover:bg-gray-100 mt-2">
                  <Camera className="mr-2 h-4 w-4" />
                  Scan a Dish
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        {/* Main Features Grid with Icons only */}
        <div className="grid grid-cols-4 gap-4">
          {mainFeatures.map((feature, index) => (
            <Link to={feature.path} key={index} className="text-center">
              <div className="flex flex-col items-center">
                <div className={`${feature.color} rounded-full w-14 h-14 mb-2 flex items-center justify-center shadow-md card-3d`}>
                  {feature.icon}
                </div>
                <span className="text-xs font-medium text-gray-700">{feature.label}</span>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Recent Activity */}
        <h2 className="font-bold text-lg text-wasfah-deep-teal mt-6">Recent Activity</h2>
        
        {/* Today's meal plan */}
        <TodayMealPlan mealPlan={null} />
        
        {/* Expiring ingredients */}
        <ExpiringIngredients 
          expiringItems={[]} 
          onAddIngredient={() => {}} 
        />
      </div>
    </PageContainer>
  );
};

export default HomePage;
