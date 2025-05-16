
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { mockRecipes } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Clock, Users, ArrowUpRight, ChefHat, Share } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const recipe = mockRecipes.find(r => r.id === id);
  
  if (!recipe) {
    return (
      <PageContainer
        header={{
          title: 'Recipe Not Found',
          showBackButton: true,
        }}
      >
        <div className="container px-4 py-8 text-center">
          <p>The recipe you're looking for doesn't exist.</p>
          <Button 
            className="mt-4 bg-wasfah-bright-teal hover:bg-wasfah-teal"
            onClick={() => navigate('/recipes')}
          >
            Browse Recipes
          </Button>
        </div>
      </PageContainer>
    );
  }

  const handleAddToShoppingList = () => {
    toast({
      title: "Added to Shopping List",
      description: "Missing ingredients have been added to your shopping list.",
    });
  };

  const handleStartCookingMode = () => {
    navigate(`/recipe/${id}/cooking`);
  };

  return (
    <PageContainer
      header={{
        showBackButton: true,
        actions: (
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" className="text-wasfah-deep-teal">
              <Heart 
                size={20} 
                className={recipe.isFavorite ? 'fill-wasfah-coral-red text-wasfah-coral-red' : ''}
              />
            </Button>
            <Button variant="ghost" size="icon" className="text-wasfah-deep-teal">
              <Share size={20} />
            </Button>
          </div>
        ),
      }}
    >
      <div>
        <div 
          className="w-full h-56 bg-cover bg-center"
          style={{ backgroundImage: `url(${recipe.image})` }}
        />
        
        <div className="container px-4 py-4">
          <h1 className="recipe-title text-2xl font-bold text-wasfah-deep-teal">
            {recipe.title}
          </h1>
          
          <div className="flex items-center mt-1 text-sm">
            <span className="text-wasfah-mint">★</span>
            <span className="ml-1 text-gray-700">{recipe.rating}</span>
            <span className="mx-1 text-gray-400">|</span>
            <span className="text-gray-700">{recipe.ratingCount} ratings</span>
          </div>
          
          <p className="mt-3 text-gray-600">
            {recipe.description}
          </p>
          
          <div className="grid grid-cols-4 gap-2 mt-4">
            <Card className="p-3 text-center">
              <div className="flex justify-center text-wasfah-bright-teal mb-1">
                <Clock size={18} />
              </div>
              <p className="text-sm font-semibold">{recipe.prepTime + recipe.cookTime}m</p>
              <p className="text-xs text-gray-500">Time</p>
            </Card>
            
            <Card className="p-3 text-center">
              <div className="flex justify-center text-wasfah-bright-teal mb-1">
                <Users size={18} />
              </div>
              <p className="text-sm font-semibold">{recipe.servings}</p>
              <p className="text-xs text-gray-500">Servings</p>
            </Card>
            
            <Card className="p-3 text-center">
              <div className="flex justify-center text-wasfah-bright-teal mb-1">
                <ChefHat size={18} />
              </div>
              <p className="text-sm font-semibold">{recipe.difficulty}</p>
              <p className="text-xs text-gray-500">Difficulty</p>
            </Card>
            
            <Card className="p-3 text-center">
              <div className="flex justify-center text-wasfah-bright-teal mb-1">
                <ArrowUpRight size={18} />
              </div>
              <p className="text-sm font-semibold">{recipe.calories}</p>
              <p className="text-xs text-gray-500">Calories</p>
            </Card>
          </div>
          
          <h2 className="text-lg font-bold mt-6 text-wasfah-deep-teal">
            Ingredients
          </h2>
          
          <div className="mt-3 space-y-3">
            {recipe.ingredients.map((ingredient) => (
              <div key={ingredient.id} className="flex items-center space-x-2">
                <Checkbox id={ingredient.id} />
                <label
                  htmlFor={ingredient.id}
                  className={`text-gray-700 ${ingredient.inPantry ? '' : 'text-wasfah-coral-red'}`}
                >
                  {ingredient.quantity} {ingredient.unit} {ingredient.name}
                  {!ingredient.inPantry && ' (missing)'}
                </label>
              </div>
            ))}
          </div>
          
          <Button
            variant="outline"
            className="w-full mt-4 border-wasfah-bright-teal text-wasfah-bright-teal hover:bg-wasfah-bright-teal/10"
            onClick={handleAddToShoppingList}
          >
            Add missing to shopping list
          </Button>
          
          <h2 className="text-lg font-bold mt-6 text-wasfah-deep-teal">
            Instructions
          </h2>
          
          <ol className="mt-3 space-y-4 list-decimal list-inside">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="text-gray-700 pl-2">
                {instruction}
              </li>
            ))}
          </ol>
          
          <Button
            className="w-full mt-6 mb-4 bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
            onClick={handleStartCookingMode}
          >
            <ChefHat size={18} className="mr-2" />
            Start Cooking Mode
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
