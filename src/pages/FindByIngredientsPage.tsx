
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { Recipe } from '@/types';
import { ChevronDown, Plus, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { mockRecipes } from '@/data/mockData';

// Mock categories with their ingredients
const ingredientCategories = [
  {
    name: 'Vegetables',
    ingredients: ['Tomato', 'Onion', 'Bell Pepper', 'Carrot', 'Zucchini', 'Eggplant', 'Potato', 'Cucumber', 'Spinach']
  },
  {
    name: 'Proteins',
    ingredients: ['Chicken', 'Beef', 'Fish', 'Tofu', 'Eggs', 'Pork', 'Shrimp', 'Beans', 'Lentils']
  },
  {
    name: 'Dairy',
    ingredients: ['Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream', 'Cream Cheese']
  },
  {
    name: 'Grains',
    ingredients: ['Rice', 'Pasta', 'Bread', 'Quinoa', 'Oats', 'Flour', 'Couscous']
  },
  {
    name: 'Herbs & Spices',
    ingredients: ['Basil', 'Oregano', 'Cumin', 'Cinnamon', 'Paprika', 'Thyme', 'Rosemary', 'Cilantro', 'Mint']
  }
];

export default function FindByIngredientsPage() {
  const [selectedTab, setSelectedTab] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  
  const toggleCategory = (categoryName: string) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryName);
    }
  };
  
  const toggleIngredient = (ingredient: string) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };
  
  const handleSearch = () => {
    if (selectedIngredients.length === 0) {
      toast({
        title: "No ingredients selected",
        description: "Please select at least one ingredient to find recipes.",
        variant: "destructive"
      });
      return;
    }
    
    // Mock search functionality - in a real app, this would call an API
    const results = mockRecipes.filter(recipe => 
      // Normally we'd check recipe.ingredients here, but our mock data doesn't have detailed ingredients
      // This is just a simulation
      Math.random() > 0.5
    );
    
    setFilteredRecipes(results);
    setSelectedTab('results');
    
    toast({
      title: "Recipes Found",
      description: `Found ${results.length} recipes with your selected ingredients.`
    });
  };

  // Filter ingredients based on search
  const getFilteredIngredients = (categoryIngredients: string[]) => {
    if (!searchTerm) return categoryIngredients;
    return categoryIngredients.filter(ingredient => 
      ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  return (
    <PageContainer header={{ title: 'Find Recipes by Ingredients', showBackButton: true }}>
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="pb-24">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="add">Add Ingredients</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>
        
        <TabsContent value="add" className="space-y-4 mt-4">
          <div className="sticky top-16 bg-white z-10 pb-2">
            <Input
              type="search"
              placeholder="Search ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-2"
            />
            
            {selectedIngredients.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Selected ingredients:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedIngredients.map(ingredient => (
                    <div 
                      key={ingredient}
                      className="bg-wasfah-bright-teal text-white px-3 py-1 rounded-full text-xs flex items-center"
                      onClick={() => toggleIngredient(ingredient)}
                    >
                      {ingredient}
                      <span className="ml-1 cursor-pointer">×</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            {ingredientCategories.map(category => {
              const filteredIngredients = getFilteredIngredients(category.ingredients);
              
              // Skip categories with no matching ingredients when searching
              if (searchTerm && filteredIngredients.length === 0) return null;
              
              return (
                <Card key={category.name}>
                  <div 
                    className="p-3 font-medium flex justify-between items-center cursor-pointer"
                    onClick={() => toggleCategory(category.name)}
                  >
                    {category.name}
                    <ChevronDown 
                      size={18} 
                      className={`transition-transform ${expandedCategory === category.name ? 'rotate-180' : ''}`} 
                    />
                  </div>
                  
                  {(expandedCategory === category.name || searchTerm) && (
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2">
                        {filteredIngredients.map(ingredient => (
                          <Button
                            key={ingredient}
                            variant="outline"
                            size="sm"
                            className={`
                              border-wasfah-deep-teal
                              ${selectedIngredients.includes(ingredient)
                                ? 'bg-wasfah-deep-teal text-white'
                                : 'text-wasfah-deep-teal'
                              }
                            `}
                            onClick={() => toggleIngredient(ingredient)}
                          >
                            {selectedIngredients.includes(ingredient) ? ingredient : (
                              <>
                                <Plus size={14} className="mr-1" />
                                {ingredient}
                              </>
                            )}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
          
          <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-gray-200">
            <Button 
              className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
              onClick={handleSearch}
              disabled={selectedIngredients.length === 0}
            >
              <Search className="mr-2 h-4 w-4" />
              Find Recipes ({selectedIngredients.length})
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="results" className="mt-4">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Recipes with:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedIngredients.map(ingredient => (
                <div 
                  key={ingredient}
                  className="bg-wasfah-bright-teal text-white px-3 py-1 rounded-full text-xs"
                >
                  {ingredient}
                </div>
              ))}
            </div>
            
            {filteredRecipes.length > 0 ? (
              <RecipeGrid recipes={filteredRecipes} columns={2} cardSize="medium" />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No recipes found. Try selecting different ingredients.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSelectedTab('add')}
                >
                  Edit Ingredients
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
