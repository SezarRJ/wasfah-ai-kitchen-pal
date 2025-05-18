
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { RecommendedRecipes } from '@/components/home/RecommendedRecipes';
import { TodayMealPlan } from '@/components/home/TodayMealPlan';
import { ExpiringIngredients } from '@/components/home/ExpiringIngredients';
import { QuickActionsSection } from '@/components/home/QuickActionsSection';
import { LoyaltyCard } from '@/components/home/LoyaltyCard';
import { SubscriptionBanner } from '@/components/home/SubscriptionBanner';
import { AdminLink } from '@/components/admin/AdminLink';

// Mock data for components
const mockRecipes = [
  { id: '1', title: 'Pasta Carbonara', image: '/placeholder.svg', duration: '30 min', difficulty: 'Medium', rating: 4.8, isFavorite: true },
  { id: '2', title: 'Chicken Curry', image: '/placeholder.svg', duration: '45 min', difficulty: 'Medium', rating: 4.6, isFavorite: false },
  { id: '3', title: 'Vegetable Stir-Fry', image: '/placeholder.svg', duration: '20 min', difficulty: 'Easy', rating: 4.5, isFavorite: true },
  { id: '4', title: 'Beef Stew', image: '/placeholder.svg', duration: '90 min', difficulty: 'Hard', rating: 4.7, isFavorite: false }
];

const mockCategories = ['Italian', 'Indian', 'Chinese', 'Mexican', 'American'];

const mockMealPlan = {
  id: '1',
  date: new Date(),
  meals: [
    { id: '1', title: 'Breakfast - Avocado Toast', time: '8:00 AM', image: '/placeholder.svg', calories: 350 },
    { id: '2', title: 'Lunch - Caesar Salad', time: '12:30 PM', image: '/placeholder.svg', calories: 450 },
    { id: '3', title: 'Dinner - Grilled Salmon', time: '7:00 PM', image: '/placeholder.svg', calories: 550 }
  ]
};

const mockExpiringItems = [
  { id: '1', name: 'Spinach', expiryDate: new Date(Date.now() + 86400000) }, // 1 day from now
  { id: '2', name: 'Chicken', expiryDate: new Date(Date.now() + 172800000) }, // 2 days from now
  { id: '3', name: 'Yogurt', expiryDate: new Date(Date.now() + 259200000) }, // 3 days from now
  { id: '4', name: 'Tomatoes', expiryDate: new Date(Date.now() + 345600000) } // 4 days from now
];

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const header = {
    showLogo: true,
    showSearch: true,
    actions: null,
  };

  return (
    <PageContainer header={header}>
      <div className="space-y-6">
        <RecommendedRecipes 
          recipes={mockRecipes}
          categories={mockCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <TodayMealPlan mealPlan={mockMealPlan} />
        <ExpiringIngredients expiringItems={mockExpiringItems} />
        <QuickActionsSection />
        <LoyaltyCard />
        <SubscriptionBanner />
      </div>
      <AdminLink />
    </PageContainer>
  );
};

export default HomePage;
