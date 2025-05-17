
import React, { useState, useEffect } from 'react';
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
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading data with a slight delay to show animations when components mount
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
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

  if (!isLoaded) {
    return (
      <PageContainer header={{ showLogo: true, showSearch: true }}>
        <div className="container px-4 py-4 flex justify-center items-center h-[90vh]">
          <div className="w-8 h-8 border-4 border-wasfah-bright-teal border-t-transparent rounded-full animate-spin"></div>
        </div>
      </PageContainer>
    );
  }

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
        <div className="animate-fade-in" style={{ animationDelay: "0ms" }}>
          <FeaturedRecipe recipe={featuredRecipe} />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <QuickActionsSection />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <SubscriptionBanner />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
          <LoyaltyCard />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
          <ExpiringIngredients expiringItems={expiringItems} />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: "500ms" }}>
          <RecommendedRecipes 
            recipes={recommendedRecipes}
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: "600ms" }}>
          <TodayMealPlan mealPlan={todayMealPlan} />
        </div>
      </div>
    </PageContainer>
  );
}
