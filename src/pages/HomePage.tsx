
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChefHat, Search, Activity, Heart, Globe, Calendar, ShoppingCart, Share2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChefAvatarDisplay } from '@/components/chef-avatar/ChefAvatarDisplay';
import { ChefTipCard } from '@/components/chef-avatar/ChefTipCard';
import { RecommendedRecipes } from '@/components/home/RecommendedRecipes';
import { TodayMealPlan } from '@/components/home/TodayMealPlan';
import { ExpiringIngredients } from '@/components/home/ExpiringIngredients';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const header = {
    showLogo: true,
    showSearch: true,
    actions: null,
  };

  const mockChefTips = [
    "Try adding a splash of vinegar when poaching eggs to help them keep their shape.",
    "Use a wooden spoon to check if your oil is hot enough for frying - if bubbles form around it, the oil is ready.",
    "Let meat rest for a few minutes after cooking to allow juices to redistribute."
  ];

  const handleApplyTip = (tip: string) => {
    console.log("Tip applied:", tip);
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
      icon: <ChefHat className="h-6 w-6 text-white" />, 
      label: "Chef Avatar", 
      path: "/chef-avatar",
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
        {/* Chef Avatar and Tip */}
        <div className="mb-6">
          <ChefAvatarDisplay 
            name="Chef Alex"
            level={5}
            experience={340}
            nextLevelExperience={500}
            personality="Creative"
            avatarUrl="/placeholder.svg"
            achievements={[]}
          />
        </div>
        
        <ChefTipCard 
          tip={mockChefTips[Math.floor(Math.random() * mockChefTips.length)]} 
          chefName="Chef Alex"
          personality="Creative"
          onApply={handleApplyTip}
        />
        
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
