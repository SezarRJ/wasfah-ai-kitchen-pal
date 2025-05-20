
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { Recipe } from '@/types';
import { ChevronDown, Plus, Search, Filter, Utensils, Dessert, Wine, XCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { mockRecipes } from '@/data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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

// Main recipe categories
const mainCategories = ['Foods', 'Desserts', 'Drinks'];

// Subcategories based on main category
const subcategories = {
  'Foods': ['Main Dishes', 'Appetizers', 'Pickles', 'Soups', 'Sauces', 'Others'],
  'Desserts': ['Traditional', 'Western', 'Pastries', 'Ice Cream', 'Others'],
  'Drinks': ['Detox', 'Cocktails', 'Alcoholic', 'Hot Drinks', 'Others']
};

export default function FindByIngredientsPage() {
  const [selectedTab, setSelectedTab] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  
  // New state for adding custom ingredients
  const [newIngredientName, setNewIngredientName] = useState('');
  const [newIngredientCategory, setNewIngredientCategory] = useState('');
  
  // New state for categories and filters
  const [selectedMainCategory, setSelectedMainCategory] = useState('Foods');
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [dietaryFilter, setDietaryFilter] = useState('');
  const [cookingTimeFilter, setCookingTimeFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  
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
  
  const toggleSubcategory = (subcategory: string) => {
    if (selectedSubcategories.includes(subcategory)) {
      setSelectedSubcategories(selectedSubcategories.filter(item => item !== subcategory));
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategory]);
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
    const results = mockRecipes.filter(recipe => {
      // This is just a simulation since mockRecipes doesn't have detailed properties
      return Math.random() > 0.3;
    });
    
    setFilteredRecipes(results);
    setSelectedTab('results');
    
    toast({
      title: "Recipes Found",
      description: `Found ${results.length} recipes with your selected ingredients and filters.`
    });
  };
  
  // Handle adding a new custom ingredient
  const handleAddNewIngredient = () => {
    if (!newIngredientName.trim()) {
      toast({
        title: "Invalid ingredient",
        description: "Please enter an ingredient name.",
        variant: "destructive"
      });
      return;
    }
    
    if (!newIngredientCategory) {
      toast({
        title: "Select a category",
        description: "Please select a category for your ingredient.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if ingredient already exists
    const categoryExists = ingredientCategories.find(cat => cat.name === newIngredientCategory);
    if (categoryExists && categoryExists.ingredients.includes(newIngredientName)) {
      toast({
        title: "Ingredient exists",
        description: "This ingredient already exists in the selected category.",
        variant: "destructive"
      });
      return;
    }
    
    // Add the ingredient to the category (in a real app, this would update the database)
    // For this demo, we'll just add it to the selected ingredients
    setSelectedIngredients([...selectedIngredients, newIngredientName]);
    toast({
      title: "Ingredient added",
      description: `${newIngredientName} added to your ingredients.`
    });
    
    // Reset the form
    setNewIngredientName('');
    setNewIngredientCategory('');
  };

  // Get icon for main category
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Foods':
        return <Utensils size={16} className="mr-2" />;
      case 'Desserts':
        return <Dessert size={16} className="mr-2" />;
      case 'Drinks':
        return <Wine size={16} className="mr-2" />;
      default:
        return null;
    }
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
            <div className="flex items-center gap-2">
              <Input
                type="search"
                placeholder="Search ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Plus size={18} />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Ingredient</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Ingredient Name</label>
                      <Input 
                        placeholder="Enter ingredient name" 
                        value={newIngredientName}
                        onChange={(e) => setNewIngredientName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <Select value={newIngredientCategory} onValueChange={setNewIngredientCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {ingredientCategories.map(category => (
                            <SelectItem key={category.name} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      onClick={handleAddNewIngredient}
                      className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
                    >
                      Add Ingredient
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            {selectedIngredients.length > 0 && (
              <div className="mb-4 mt-3">
                <p className="text-sm text-gray-600 mb-2">Selected ingredients:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedIngredients.map(ingredient => (
                    <div 
                      key={ingredient}
                      className="bg-wasfah-bright-teal text-white px-3 py-1 rounded-full text-xs flex items-center"
                      onClick={() => toggleIngredient(ingredient)}
                    >
                      {ingredient}
                      <XCircle size={14} className="ml-1 cursor-pointer" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Main Categories (horizontal scroll) */}
          <div className="overflow-x-auto pb-2">
            <div className="flex space-x-2 min-w-max">
              {mainCategories.map((category) => (
                <Button 
                  key={category}
                  variant={selectedMainCategory === category ? "default" : "outline"}
                  className={selectedMainCategory === category ? 
                    "bg-wasfah-bright-teal hover:bg-wasfah-teal" : 
                    "border-wasfah-bright-teal text-wasfah-bright-teal"}
                  onClick={() => setSelectedMainCategory(category)}
                >
                  {getCategoryIcon(category)}
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Subcategories */}
          <div className="overflow-x-auto pb-2">
            <div className="flex space-x-2 min-w-max">
              {subcategories[selectedMainCategory as keyof typeof subcategories].map((subcat) => (
                <Button 
                  key={subcat}
                  variant="outline"
                  size="sm"
                  className={selectedSubcategories.includes(subcat) ? 
                    "bg-wasfah-deep-teal text-white border-wasfah-deep-teal" : 
                    "border-wasfah-deep-teal text-wasfah-deep-teal"}
                  onClick={() => toggleSubcategory(subcat)}
                >
                  {subcat}
                </Button>
              ))}
            </div>
          </div>

          {/* Advanced Filters */}
          <Card className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-wasfah-deep-teal flex items-center">
                <Filter size={16} className="mr-2" />
                Advanced Filters
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Dietary</label>
                <Select value={dietaryFilter} onValueChange={setDietaryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="gluten-free">Gluten Free</SelectItem>
                    <SelectItem value="keto">Keto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Cooking Time</label>
                <Select value={cookingTimeFilter} onValueChange={setCookingTimeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under15">Under 15 mins</SelectItem>
                    <SelectItem value="under30">Under 30 mins</SelectItem>
                    <SelectItem value="under60">Under 60 mins</SelectItem>
                    <SelectItem value="over60">Over 60 mins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty</label>
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
          
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
            
            {selectedSubcategories.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Categories:</p>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-wasfah-deep-teal text-white px-3 py-1 rounded-full text-xs">
                    {selectedMainCategory}
                  </div>
                  {selectedSubcategories.map(subcat => (
                    <div key={subcat} className="bg-wasfah-deep-teal text-white px-3 py-1 rounded-full text-xs">
                      {subcat}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
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
