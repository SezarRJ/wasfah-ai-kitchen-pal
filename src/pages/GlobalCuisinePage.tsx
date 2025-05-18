
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockRecipes } from '@/data/mockData';

const GlobalCuisinePage = () => {
  const [selectedMainCategory, setSelectedMainCategory] = useState('Foods');
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState('');

  // Main categories and their subcategories
  const categories = {
    'Foods': ['Main Dishes', 'Appetizers', 'Pickles', 'Soups', 'Sauces', 'Others'],
    'Desserts': ['Traditional', 'Western', 'Pastries', 'Ice Cream', 'Others'],
    'Drinks': ['Detox', 'Cocktails', 'Alcoholic', 'Hot Drinks', 'Others']
  };

  // List of cuisine countries
  const cuisines = [
    'Levant', 'Italian', 'Mexican', 'Chinese', 'Indian', 'Japanese', 'Thai', 
    'Turkish', 'Syrian', 'Iraqi', 'Yemeni', 'American', 'Moroccan', 'Lebanese', 'German'
  ];

  const toggleSubcategory = (subcategory: string) => {
    if (selectedSubcategories.includes(subcategory)) {
      setSelectedSubcategories(selectedSubcategories.filter(item => item !== subcategory));
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategory]);
    }
  };

  return (
    <PageContainer
      header={{
        title: 'Global Cuisine',
        showBackButton: true,
        showSearch: true,
      }}
    >
      <div className="space-y-6 pb-20">
        {/* Filter Section - Cuisine Country */}
        <Card className="p-4">
          <h3 className="font-semibold text-wasfah-deep-teal mb-3">Select Cuisine</h3>
          <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
            <SelectTrigger>
              <SelectValue placeholder="Select cuisine country" />
            </SelectTrigger>
            <SelectContent>
              {cuisines.map((cuisine) => (
                <SelectItem key={cuisine} value={cuisine.toLowerCase()}>
                  {cuisine}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>
        
        {/* Main Categories (horizontal scroll) */}
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-2 min-w-max">
            {Object.keys(categories).map((category) => (
              <Button 
                key={category}
                variant={selectedMainCategory === category ? "default" : "outline"}
                className={selectedMainCategory === category ? 
                  "bg-wasfah-bright-teal hover:bg-wasfah-teal" : 
                  "border-wasfah-bright-teal text-wasfah-bright-teal"}
                onClick={() => setSelectedMainCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Subcategories */}
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-2 min-w-max">
            {categories[selectedMainCategory as keyof typeof categories].map((subcategory) => (
              <Button 
                key={subcategory}
                variant="outline"
                size="sm"
                className={selectedSubcategories.includes(subcategory) ? 
                  "bg-wasfah-deep-teal text-white border-wasfah-deep-teal" : 
                  "border-wasfah-deep-teal text-wasfah-deep-teal"}
                onClick={() => toggleSubcategory(subcategory)}
              >
                {subcategory}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Recipe Results */}
        <div className="mt-6">
          <h2 className="text-lg font-bold text-wasfah-deep-teal mb-4">
            {selectedCuisine ? `${selectedCuisine} Recipes` : 'Recommended for you'}
          </h2>
          <RecipeGrid recipes={mockRecipes} columns={2} cardSize="medium" />
        </div>
        
        {/* Bottom CTA */}
        <Button 
          className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal text-lg py-6"
        >
          Find Recipe
        </Button>
      </div>
    </PageContainer>
  );
};

export default GlobalCuisinePage;
