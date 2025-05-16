
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { FeaturedRecipe } from '@/components/recipe/FeaturedRecipe';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { CategoryFilters } from '@/components/recipe/CategoryFilters';
import { mockRecipes, mockPantryItems, mockMealPlans, categories } from '@/data/mockData';
import { MealCard } from '@/components/meal-plan/MealCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Utensils, Award, Target, Activity, ShoppingCart, 
  Wallet, Gift, Sparkles, Swap, ChevronRight 
} from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const featuredRecipe = mockRecipes[0];
  const recommendedRecipes = mockRecipes.slice(1, 5);
  
  // Filter pantry items that are expiring soon (within 3 days)
  const expiringItems = mockPantryItems.filter(item => {
    if (!item.expiryDate) return false;
    const expiryDate = new Date(item.expiryDate);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 3;
  });
  
  // Get today's meal plan
  const todayDate = new Date().toISOString().split('T')[0];
  const todayMealPlan = mockMealPlans.find(mp => mp.date === todayDate) || mockMealPlans[0];

  return (
    <PageContainer
      header={{
        showLogo: true,
        showSearch: true,
        actions: (
          <Link to="/auth">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
        )
      }}
    >
      <div className="container px-4 py-4 space-y-6">
        <FeaturedRecipe recipe={featuredRecipe} />
        
        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2">
          <Link to="/health-tracking">
            <Card className="text-center p-2 hover:shadow-md transition-all">
              <CardContent className="p-1">
                <Activity className="h-6 w-6 mx-auto text-wasfah-bright-teal" />
                <div className="text-xs mt-1 font-medium">Track Health</div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/ingredient-swap">
            <Card className="text-center p-2 hover:shadow-md transition-all">
              <CardContent className="p-1">
                <Swap className="h-6 w-6 mx-auto text-wasfah-bright-teal" />
                <div className="text-xs mt-1 font-medium">Swap Ingredients</div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/shopping-list">
            <Card className="text-center p-2 hover:shadow-md transition-all">
              <CardContent className="p-1">
                <ShoppingCart className="h-6 w-6 mx-auto text-wasfah-bright-teal" />
                <div className="text-xs mt-1 font-medium">Shopping List</div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/nutrition-goals">
            <Card className="text-center p-2 hover:shadow-md transition-all">
              <CardContent className="p-1">
                <Target className="h-6 w-6 mx-auto text-wasfah-bright-teal" />
                <div className="text-xs mt-1 font-medium">Set Goals</div>
              </CardContent>
            </Card>
          </Link>
        </div>
        
        {/* Subscription Banner */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-wasfah-deep-teal to-wasfah-bright-teal p-4 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Unlock Premium Features</h3>
                <p className="text-xs opacity-90">Get personalized AI recommendations</p>
              </div>
              <Link to="/subscription">
                <Button size="sm" variant="secondary" className="text-wasfah-deep-teal bg-white hover:bg-gray-100">
                  Upgrade <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
        
        {/* Loyalty Badge */}
        <Link to="/loyalty">
          <Card className="border-wasfah-bright-teal hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-wasfah-bright-teal mr-3" />
                  <div>
                    <div className="text-wasfah-deep-teal font-medium">Gold Level Member</div>
                    <div className="text-xs text-gray-600">850 points</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-2">
                    <div className="text-xs text-right text-gray-600">Next level</div>
                    <Progress value={56.6} className="w-20 h-1.5" />
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        {expiringItems.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-wasfah-deep-teal">Cook with what you have</h2>
              <Link to="/pantry">
                <Button variant="link" className="text-wasfah-bright-teal p-0">
                  View All
                </Button>
              </Link>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-3">
                You have {expiringItems.length} items expiring soon. Let's use them!
              </p>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {expiringItems.map(item => (
                  <div
                    key={item.id}
                    className="px-3 py-2 bg-wasfah-light-gray rounded-md text-wasfah-deep-teal text-sm whitespace-nowrap flex-shrink-0 border border-gray-200"
                  >
                    {item.name}
                  </div>
                ))}
                <div className="px-3 py-2 bg-wasfah-light-gray rounded-md text-wasfah-bright-teal text-sm font-medium whitespace-nowrap flex-shrink-0 border border-wasfah-bright-teal flex items-center">
                  + Add
                </div>
              </div>
              <Button className="w-full mt-3 bg-wasfah-bright-teal hover:bg-wasfah-teal text-white">
                <Utensils size={16} className="mr-2" />
                Find Recipes
              </Button>
            </div>
          </div>
        )}
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-wasfah-deep-teal">Recommended for you</h2>
            <Link to="/recipes">
              <Button variant="link" className="text-wasfah-bright-teal p-0">
                View All
              </Button>
            </Link>
          </div>
          
          <CategoryFilters
            categories={['All', ...categories]}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          <div className="mt-4">
            <RecipeGrid recipes={recommendedRecipes} columns={2} cardSize="medium" />
          </div>
        </div>
        
        {todayMealPlan && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-wasfah-deep-teal">Your meal plan today</h2>
              <Link to="/meal-plan">
                <Button variant="link" className="text-wasfah-bright-teal p-0">
                  View Week
                </Button>
              </Link>
            </div>
            
            <div>
              {todayMealPlan.meals.map(meal => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
