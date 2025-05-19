
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChefHat, Search, Activity, Heart, Users, Star, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChefAvatarDisplay } from '@/components/chef-avatar/ChefAvatarDisplay';
import { ChefTipCard } from '@/components/chef-avatar/ChefTipCard';
import { RecommendedRecipes } from '@/components/home/RecommendedRecipes';
import { TodayMealPlan } from '@/components/home/TodayMealPlan';
import { ExpiringIngredients } from '@/components/home/ExpiringIngredients';
import { LoyaltyCard } from '@/components/home/LoyaltyCard';
import { AdminLink } from '@/components/admin/AdminLink';
import { Recipe, PantryItem, MealPlan } from '@/types';
import { useToast } from '@/hooks/use-toast';

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
  }
];

const mockCategories = ['Italian', 'Indian', 'Chinese', 'Mexican', 'American'];

// Create properly structured meal plan with meal objects
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
    }
  ],
  nutritionSummary: {
    calories: 800,
    protein: 35,
    carbs: 90,
    fat: 30
  }
};

const mockExpiringItems: PantryItem[] = [
  { id: '1', name: 'Spinach', quantity: 300, unit: 'g', category: 'Vegetables', expiryDate: new Date(Date.now() + 86400000).toISOString(), location: 'Refrigerator' },
  { id: '2', name: 'Chicken', quantity: 500, unit: 'g', category: 'Meat & Poultry', expiryDate: new Date(Date.now() + 172800000).toISOString(), location: 'Refrigerator' }
];

const mockChefTips = [
  "Try adding a splash of vinegar when poaching eggs to help them keep their shape.",
  "Use a wooden spoon to check if your oil is hot enough for frying - if bubbles form around it, the oil is ready.",
  "Let meat rest for a few minutes after cooking to allow juices to redistribute."
];

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const { toast } = useToast();
  const header = {
    showLogo: true,
    showSearch: true,
    actions: null,
  };

  const handleAddIngredient = (item: string) => {
    toast({
      title: "Ingredient Added",
      description: `${item} has been added to your cooking list.`
    });
  };

  const handleApplyTip = (tip: string) => {
    toast({
      title: "Tip Saved",
      description: "Cooking tip saved to your favorites."
    });
  };

  return (
    <PageContainer header={header}>
      <div className="space-y-6 pb-24">
        {/* Chef Avatar Section */}
        <div className="mb-6">
          <ChefAvatarDisplay 
            name="Chef Alex"
            level={5}
            experience={340}
            nextLevelExperience={500}
            personality="Creative"
            avatarUrl="/placeholder.svg"
            achievements={[
              { id: '1', title: 'Recipe Master', icon: <Star size={14} /> },
              { id: '2', title: 'Social Cook', icon: <Users size={14} /> }
            ]}
          />
        </div>
        
        {/* Chef Tip */}
        <ChefTipCard 
          tip={mockChefTips[Math.floor(Math.random() * mockChefTips.length)]} 
          chefName="Chef Alex"
          personality="Creative"
          onApply={handleApplyTip}
        />
        
        {/* Main Feature Navigation Cards */}
        <div className="grid grid-cols-1 gap-4">
          <Link to="/chef-avatar">
            <Card className="hover:shadow-md transition-shadow border-wasfah-bright-teal/20">
              <CardContent className="p-4 flex items-center">
                <div className="p-3 bg-wasfah-bright-teal rounded-full mr-4">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-wasfah-deep-teal">Chef Avatar</h2>
                  <p className="text-sm text-gray-600">Personalized cooking assistant & tips</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/find-by-ingredients">
            <Card className="hover:shadow-md transition-shadow border-wasfah-bright-teal/20">
              <CardContent className="p-4 flex items-center">
                <div className="p-3 bg-wasfah-deep-teal rounded-full mr-4">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-wasfah-deep-teal">Find Recipes by Ingredients</h2>
                  <p className="text-sm text-gray-600">Browse recipes based on what you have</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/health-tracking-home">
            <Card className="hover:shadow-md transition-shadow border-wasfah-bright-teal/20">
              <CardContent className="p-4 flex items-center">
                <div className="p-3 bg-green-500 rounded-full mr-4">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-wasfah-deep-teal">Health & Tracking</h2>
                  <p className="text-sm text-gray-600">Monitor nutrition goals and progress</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
        
        {/* Additional Feature Cards */}
        <h2 className="font-bold text-lg text-wasfah-deep-teal mt-6">More Features</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/global-cuisine">
            <Card className="hover:shadow-sm transition-shadow h-full">
              <CardContent className="p-3 flex flex-col items-center justify-center h-full">
                <Search className="h-5 w-5 text-wasfah-bright-teal mb-2" />
                <p className="text-sm text-center font-medium">Global Cuisine</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/shared-recipes-tracking">
            <Card className="hover:shadow-sm transition-shadow h-full">
              <CardContent className="p-3 flex flex-col items-center justify-center h-full">
                <Users className="h-5 w-5 text-wasfah-bright-teal mb-2" />
                <p className="text-sm text-center font-medium">Shared Recipes</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/favorites">
            <Card className="hover:shadow-sm transition-shadow h-full">
              <CardContent className="p-3 flex flex-col items-center justify-center h-full">
                <Heart className="h-5 w-5 text-red-500 mb-2" />
                <p className="text-sm text-center font-medium">Favorites</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/loyalty">
            <Card className="hover:shadow-sm transition-shadow h-full">
              <CardContent className="p-3 flex flex-col items-center justify-center h-full">
                <Award className="h-5 w-5 text-amber-500 mb-2" />
                <p className="text-sm text-center font-medium">Loyalty Program</p>
              </CardContent>
            </Card>
          </Link>
        </div>
        
        {/* Recent Activity */}
        <h2 className="font-bold text-lg text-wasfah-deep-teal mt-6">Recent Activity</h2>
        <div className="space-y-4">
          <RecommendedRecipes 
            recipes={mockRecipes}
            categories={mockCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          <TodayMealPlan mealPlan={mockMealPlan} />
          
          <ExpiringIngredients 
            expiringItems={mockExpiringItems} 
            onAddIngredient={handleAddIngredient} 
          />
          
          <LoyaltyCard />
        </div>
      </div>
      <AdminLink />
    </PageContainer>
  );
};

export default HomePage;
