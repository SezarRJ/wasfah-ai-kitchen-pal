
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { Recipe } from '@/types';
import { Eye, Heart, Share2, ChefHat, BarChart2, Award, TrendingUp } from 'lucide-react';

// Mock shared recipes data
const mockSharedRecipes: Recipe[] = [
  { 
    id: 's1', 
    title: 'Homemade Pasta', 
    image: '/placeholder.svg', 
    description: 'My special homemade pasta recipe with fresh herbs.',
    prepTime: 30,
    cookTime: 15,
    servings: 4,
    difficulty: 'Medium', 
    calories: 450, 
    rating: 4.8, 
    ratingCount: 32, 
    cuisineType: 'Italian',
    ingredients: [],
    instructions: [],
    tags: ['Italian', 'Pasta', 'Homemade'],
    isFavorite: true 
  },
  { 
    id: 's2', 
    title: 'Spicy Chicken Curry', 
    image: '/placeholder.svg', 
    description: 'A flavorful curry with just the right amount of heat.',
    prepTime: 20,
    cookTime: 40,
    servings: 6,
    difficulty: 'Medium', 
    calories: 520, 
    rating: 4.6, 
    ratingCount: 18,
    cuisineType: 'Indian',
    ingredients: [],
    instructions: [],
    tags: ['Indian', 'Spicy', 'Chicken'],
    isFavorite: false 
  },
  { 
    id: 's3', 
    title: 'Chocolate Lava Cake', 
    image: '/placeholder.svg', 
    description: 'Decadent chocolate cake with a molten center.',
    prepTime: 15,
    cookTime: 12,
    servings: 4,
    difficulty: 'Easy', 
    calories: 380, 
    rating: 4.9, 
    ratingCount: 45,
    cuisineType: 'International',
    ingredients: [],
    instructions: [],
    tags: ['Dessert', 'Chocolate'],
    isFavorite: true 
  }
];

// Mock statistics for shared recipes
const mockStatistics = [
  { id: 1, recipe: 'Homemade Pasta', views: 124, likes: 32, shares: 8, used: 15 },
  { id: 2, recipe: 'Spicy Chicken Curry', views: 86, likes: 18, shares: 5, used: 9 },
  { id: 3, recipe: 'Chocolate Lava Cake', views: 211, likes: 45, shares: 22, used: 18 }
];

export default function SharedRecipesTrackingPage() {
  const [selectedTab, setSelectedTab] = useState('recipes');

  return (
    <PageContainer header={{ title: 'Shared Recipes', showBackButton: true }}>
      <div className="space-y-6 pb-24">
        <Card className="bg-gradient-to-r from-wasfah-deep-teal to-wasfah-bright-teal text-white">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">My Shared Recipes</h2>
              <p className="text-sm opacity-90">Track how your recipes are performing</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <ChefHat size={24} />
            </div>
          </CardContent>
        </Card>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="recipes">
              <ChefHat className="h-4 w-4 mr-2" />
              My Recipes
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart2 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recipes" className="mt-4">
            <div className="mb-4">
              <RecipeGrid recipes={mockSharedRecipes} columns={1} cardSize="large" />
            </div>
            
            <Button className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal">
              <Share2 className="mr-2 h-4 w-4" />
              Share New Recipe
            </Button>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-wasfah-deep-teal">Overall Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="flex justify-center">
                      <div className="p-3 rounded-full bg-blue-100">
                        <Eye className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <p className="mt-2 text-2xl font-bold">{mockStatistics.reduce((sum, item) => sum + item.views, 0)}</p>
                    <p className="text-sm text-gray-500">Total Views</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex justify-center">
                      <div className="p-3 rounded-full bg-red-100">
                        <Heart className="h-6 w-6 text-red-500" />
                      </div>
                    </div>
                    <p className="mt-2 text-2xl font-bold">{mockStatistics.reduce((sum, item) => sum + item.likes, 0)}</p>
                    <p className="text-sm text-gray-500">Total Likes</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex justify-center">
                      <div className="p-3 rounded-full bg-purple-100">
                        <Share2 className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                    <p className="mt-2 text-2xl font-bold">{mockStatistics.reduce((sum, item) => sum + item.shares, 0)}</p>
                    <p className="text-sm text-gray-500">Total Shares</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex justify-center">
                      <div className="p-3 rounded-full bg-green-100">
                        <ChefHat className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <p className="mt-2 text-2xl font-bold">{mockStatistics.reduce((sum, item) => sum + item.used, 0)}</p>
                    <p className="text-sm text-gray-500">Recipe Uses</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-wasfah-deep-teal">Top Performing Recipes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockStatistics.map((stat) => (
                    <Card key={stat.id} className="border-wasfah-bright-teal/20">
                      <CardContent className="p-3">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{stat.recipe}</h3>
                          {stat.id === 1 && (
                            <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
                              <Award className="h-3 w-3 mr-1" />
                              Top Recipe
                            </div>
                          )}
                          {stat.id === 3 && (
                            <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Trending
                            </div>
                          )}
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-center text-sm">
                          <div>
                            <p className="font-medium">{stat.views}</p>
                            <p className="text-xs text-gray-500">Views</p>
                          </div>
                          <div>
                            <p className="font-medium">{stat.likes}</p>
                            <p className="text-xs text-gray-500">Likes</p>
                          </div>
                          <div>
                            <p className="font-medium">{stat.shares}</p>
                            <p className="text-xs text-gray-500">Shares</p>
                          </div>
                          <div>
                            <p className="font-medium">{stat.used}</p>
                            <p className="text-xs text-gray-500">Uses</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
