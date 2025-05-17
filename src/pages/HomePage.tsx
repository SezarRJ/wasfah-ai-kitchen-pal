
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { FeaturedRecipe } from '@/components/recipe/FeaturedRecipe';
import { Button } from '@/components/ui/button';
import { mockRecipes, mockPantryItems, mockMealPlans, categories } from '@/data/mockData';
import { QuickActionsSection } from '@/components/home/QuickActionsSection';
import { SubscriptionBanner } from '@/components/home/SubscriptionBanner';
import { LoyaltyCard } from '@/components/home/LoyaltyCard';
import { ExpiringIngredients } from '@/components/home/ExpiringIngredients';
import { RecommendedRecipes } from '@/components/home/RecommendedRecipes';
import { TodayMealPlan } from '@/components/home/TodayMealPlan';

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
        
        <QuickActionsSection />
        
        <SubscriptionBanner />
        
        <LoyaltyCard />
        
        <ExpiringIngredients expiringItems={expiringItems} />
        
        <RecommendedRecipes 
          recipes={recommendedRecipes}
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <TodayMealPlan mealPlan={todayMealPlan} />
      </div>
    </PageContainer>
  );
}
