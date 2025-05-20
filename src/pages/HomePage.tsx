
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChefHat, Search, Activity, Heart, Globe, Calendar, ShoppingCart, Share2 } from 'lucide-react';
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
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
    },
    { 
      icon: <Globe className="h-6 w-6 text-white" />, 
      label: "Global Cuisine", 
      path: "/global-cuisine",
      color: "bg-wasfah-deep-teal",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb"
    },
    { 
      icon: <Calendar className="h-6 w-6 text-white" />, 
      label: "Meal Plan", 
      path: "/meal-plan",
      color: "bg-green-500",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
    },
    { 
      icon: <ChefHat className="h-6 w-6 text-white" />, 
      label: "Chef Avatar", 
      path: "/chef-avatar",
      color: "bg-amber-500",
      image: "https://images.unsplash.com/photo-1501286353178-1ec881214838"
    },
    { 
      icon: <Activity className="h-6 w-6 text-white" />, 
      label: "Health Tracking", 
      path: "/health-tracking-home",
      color: "bg-wasfah-coral-red",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1"
    },
    { 
      icon: <ShoppingCart className="h-6 w-6 text-white" />, 
      label: "Pantry", 
      path: "/pantry",
      color: "bg-purple-500",
      image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac"
    },
    { 
      icon: <Share2 className="h-6 w-6 text-white" />, 
      label: "Share Recipes Status", 
      path: "/shared-recipes-tracking",
      color: "bg-blue-500",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901"
    },
    { 
      icon: <Heart className="h-6 w-6 text-white" />, 
      label: "Favorites", 
      path: "/favorites",
      color: "bg-pink-500",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"
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
        
        {/* Main Features Grid with Images */}
        <div className="grid grid-cols-2 gap-3">
          {mainFeatures.map((feature, index) => (
            <Link to={feature.path} key={index}>
              <Card className="overflow-hidden border-none hover:shadow-lg transition-all duration-300">
                <div 
                  className="h-28 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${feature.image})` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center">
                      <div className={`${feature.color} p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-white text-sm font-semibold">{feature.label}</h3>
                    </div>
                  </div>
                </div>
              </Card>
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
