
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Recipe } from '@/types';
import { Bookmark, Clock, ChefHat, Fire, Users } from 'lucide-react';
import { RecipeSocialInteractions } from './RecipeSocialInteractions';

interface RecipeDetailProps {
  recipe: Recipe;
  onStartCooking: () => void;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onStartCooking }) => {
  // Mock social data (in a real app, this would come from an API)
  const socialData = {
    views: Math.floor(Math.random() * 500) + 100,
    likes: Math.floor(Math.random() * 100) + 10,
    comments: Math.floor(Math.random() * 30) + 5,
    shares: Math.floor(Math.random() * 20),
    usedCount: Math.floor(Math.random() * 50) + 10
  };

  return (
    <div className="space-y-6">
      <div className="relative h-64 rounded-lg overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h1 className="text-2xl font-bold text-white">{recipe.title}</h1>
        </div>
      </div>

      <RecipeSocialInteractions
        recipeId={recipe.id}
        views={socialData.views}
        likes={socialData.likes}
        comments={socialData.comments}
        shares={socialData.shares}
        rating={recipe.rating}
        ratingCount={recipe.ratingCount}
        usedCount={socialData.usedCount}
        isLiked={recipe.isFavorite}
      />

      <div className="flex flex-wrap justify-between gap-2">
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-1" />
          <span>Prep: {recipe.prepTime} min</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-1" />
          <span>Cook: {recipe.cookTime} min</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Users className="h-4 w-4 mr-1" />
          <span>Serves: {recipe.servings}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <ChefHat className="h-4 w-4 mr-1" />
          <span>Difficulty: {recipe.difficulty}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Fire className="h-4 w-4 mr-1" />
          <span>{recipe.calories} cal</span>
        </div>
      </div>

      <p className="text-gray-700">{recipe.description}</p>

      <Card>
        <CardContent className="p-4">
          <h2 className="font-bold text-lg mb-2">Ingredients</h2>
          <ul className="list-disc pl-5 space-y-1">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">{ingredient}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="font-bold text-lg mb-2">Instructions</h2>
          <ol className="list-decimal pl-5 space-y-3">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="text-gray-700">{instruction}</li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <div className="flex space-x-3 pt-3">
        <Button
          onClick={onStartCooking}
          className="flex-1 bg-wasfah-bright-teal hover:bg-wasfah-teal"
        >
          <ChefHat className="mr-2 h-4 w-4" /> Start Cooking
        </Button>
        <Button
          variant="outline"
          className="border-wasfah-deep-teal text-wasfah-deep-teal"
        >
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
