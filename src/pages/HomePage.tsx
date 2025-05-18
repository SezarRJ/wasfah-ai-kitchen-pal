
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { RecommendedRecipes } from '@/components/home/RecommendedRecipes';
import { TodayMealPlan } from '@/components/home/TodayMealPlan';
import { ExpiringIngredients } from '@/components/home/ExpiringIngredients';
import { QuickActionsSection } from '@/components/home/QuickActionsSection';
import { LoyaltyCard } from '@/components/home/LoyaltyCard';
import { SubscriptionBanner } from '@/components/home/SubscriptionBanner';
import { AdminLink } from '@/components/admin/AdminLink';
import { Recipe, PantryItem, MealPlan, Meal } from '@/types';

// Mock data for components
const mockRecipes: Recipe[] = [
  { 
    id: '1', 
    title: 'Pasta Carbonara', 
    image: '/placeholder.svg', 
    description: 'Classic Italian dish with eggs, cheese, pancetta, and black pepper.',
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    difficulty: 'Medium', 
    calories: 550, 
    rating: 4.8, 
    ratingCount: 243,
    cuisineType: 'Italian',
    ingredients: [],
    instructions: [],
    tags: ['Italian', 'Pasta'],
    isFavorite: true 
  },
  { 
    id: '2', 
    title: 'Chicken Curry', 
    image: '/placeholder.svg', 
    description: 'Spicy Indian-style curry with tender chicken pieces.',
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: 'Medium', 
    calories: 450, 
    rating: 4.6, 
    ratingCount: 187,
    cuisineType: 'Indian',
    ingredients: [],
    instructions: [],
    tags: ['Indian', 'Spicy'],
    isFavorite: false 
  },
  { 
    id: '3', 
    title: 'Vegetable Stir-Fry', 
    image: '/placeholder.svg', 
    description: 'Quick and healthy vegetable stir-fry.',
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    difficulty: 'Easy', 
    calories: 320, 
    rating: 4.5, 
    ratingCount: 156,
    cuisineType: 'Chinese',
    ingredients: [],
    instructions: [],
    tags: ['Vegetarian', 'Quick'],
    isFavorite: true 
  },
  { 
    id: '4', 
    title: 'Beef Stew', 
    image: '/placeholder.svg', 
    description: 'Hearty beef stew with vegetables and gravy.',
    prepTime: 20,
    cookTime: 70,
    servings: 6,
    difficulty: 'Hard', 
    calories: 480, 
    rating: 4.7, 
    ratingCount: 203,
    cuisineType: 'American',
    ingredients: [],
    instructions: [],
    tags: ['Beef', 'Comfort Food'],
    isFavorite: false 
  }
];

const mockCategories = ['Italian', 'Indian', 'Chinese', 'Mexican', 'American'];

// Create properly structured meal plan with meal objects that match the Meal type
const mockMealPlan: MealPlan = {
  id: '1',
  date: new Date().toISOString(),
  meals: [
    {
      id: '1',
      type: 'Breakfast',
      recipe: {
        id: '5',
        title: 'Avocado Toast',
        description: 'Simple and nutritious breakfast with creamy avocado on toasted bread.',
        image: '/placeholder.svg',
        prepTime: 5,
        cookTime: 3,
        servings: 1,
        difficulty: 'Easy',
        calories: 350,
        rating: 4.0,
        ratingCount: 156,
        cuisineType: 'International',
        ingredients: [],
        instructions: [],
        tags: ['Breakfast', 'Vegetarian'],
        isFavorite: true
      }
    },
    {
      id: '2',
      type: 'Lunch',
      recipe: {
        id: '6',
        title: 'Caesar Salad',
        description: 'Fresh salad with romaine lettuce and Caesar dressing.',
        image: '/placeholder.svg',
        prepTime: 10,
        cookTime: 5,
        servings: 1,
        difficulty: 'Easy',
        calories: 450,
        rating: 4.3,
        ratingCount: 128,
        cuisineType: 'International',
        ingredients: [],
        instructions: [],
        tags: ['Salad', 'Lunch'],
        isFavorite: false
      }
    },
    {
      id: '3',
      type: 'Dinner',
      recipe: {
        id: '7',
        title: 'Grilled Salmon',
        description: 'Oven-baked salmon fillet with seasonal vegetables.',
        image: '/placeholder.svg',
        prepTime: 10,
        cookTime: 15,
        servings: 1,
        difficulty: 'Medium',
        calories: 550,
        rating: 4.6,
        ratingCount: 156,
        cuisineType: 'International',
        ingredients: [],
        instructions: [],
        tags: ['Fish', 'Dinner'],
        isFavorite: false
      }
    }
  ],
  nutritionSummary: {
    calories: 1350,
    protein: 90,
    carbs: 140,
    fat: 50
  }
};

const mockExpiringItems: PantryItem[] = [
  { id: '1', name: 'Spinach', quantity: 300, unit: 'g', category: 'Vegetables', expiryDate: new Date(Date.now() + 86400000).toISOString(), location: 'Refrigerator' },
  { id: '2', name: 'Chicken', quantity: 500, unit: 'g', category: 'Meat & Poultry', expiryDate: new Date(Date.now() + 172800000).toISOString(), location: 'Refrigerator' },
  { id: '3', name: 'Yogurt', quantity: 500, unit: 'ml', category: 'Dairy & Eggs', expiryDate: new Date(Date.now() + 259200000).toISOString(), location: 'Refrigerator' },
  { id: '4', name: 'Tomatoes', quantity: 4, unit: 'pcs', category: 'Vegetables', expiryDate: new Date(Date.now() + 345600000).toISOString(), location: 'Refrigerator' }
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
