
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { FeaturedRecipe } from '@/components/recipe/FeaturedRecipe';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { CategoryFilters } from '@/components/recipe/CategoryFilters';
import { mockRecipes, mockPantryItems, mockMealPlans, categories } from '@/data/mockData';
import { MealCard } from '@/components/meal-plan/MealCard';
import { Button } from '@/components/ui/button';
import { Utensils } from 'lucide-react';

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
      }}
    >
      <div className="container px-4 py-4">
        <FeaturedRecipe recipe={featuredRecipe} />
        
        {expiringItems.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-wasfah-deep-teal">Cook with what you have</h2>
              <Button variant="link" className="text-wasfah-bright-teal p-0">
                View All
              </Button>
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
            <Button variant="link" className="text-wasfah-bright-teal p-0">
              View All
            </Button>
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
              <Button variant="link" className="text-wasfah-bright-teal p-0">
                View Week
              </Button>
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
