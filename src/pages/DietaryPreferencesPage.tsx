
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronRight, Check, Info } from 'lucide-react';
import { ChefTipCard } from '@/components/chef-avatar/ChefTipCard';
import { useToast } from '@/hooks/use-toast';

// Sample diet types
const dietTypes = [
  { id: 'vegetarian', name: 'Vegetarian', description: 'No meat, fish, or seafood' },
  { id: 'vegan', name: 'Vegan', description: 'No animal products' },
  { id: 'pescatarian', name: 'Pescatarian', description: 'Vegetarian diet with seafood' },
  { id: 'keto', name: 'Ketogenic', description: 'High-fat, low-carb' },
  { id: 'paleo', name: 'Paleo', description: 'Based on foods available to our ancestors' },
  { id: 'low-carb', name: 'Low Carb', description: 'Reduced carbohydrate intake' },
  { id: 'low-fat', name: 'Low Fat', description: 'Reduced fat intake' },
  { id: 'mediterranean', name: 'Mediterranean', description: 'Based on Mediterranean cuisine' },
  { id: 'dash', name: 'DASH', description: 'To reduce blood pressure' },
  { id: 'gluten-free', name: 'Gluten Free', description: 'Exclude gluten-containing grains' },
  { id: 'dairy-free', name: 'Dairy Free', description: 'No dairy products' },
];

// Sample allergens
const commonAllergens = [
  { id: 'peanuts', name: 'Peanuts' },
  { id: 'tree-nuts', name: 'Tree Nuts' },
  { id: 'dairy', name: 'Dairy' },
  { id: 'eggs', name: 'Eggs' },
  { id: 'fish', name: 'Fish' },
  { id: 'shellfish', name: 'Shellfish' },
  { id: 'soy', name: 'Soy' },
  { id: 'wheat', name: 'Wheat (Gluten)' },
  { id: 'sesame', name: 'Sesame' },
];

// Religious dietary restrictions
const religiousDiets = [
  { id: 'halal', name: 'Halal' },
  { id: 'kosher', name: 'Kosher' },
  { id: 'jain', name: 'Jain' },
  { id: 'hindu', name: 'Hindu' },
];

export default function DietaryPreferencesPage() {
  const { toast } = useToast();
  const [selectedDiet, setSelectedDiet] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>(['peanuts', 'shellfish']);
  const [religiousDiet, setReligiousDiet] = useState<string | null>(null);
  
  const handleDietToggle = (dietId: string) => {
    if (selectedDiet.includes(dietId)) {
      setSelectedDiet(selectedDiet.filter(id => id !== dietId));
    } else {
      setSelectedDiet([...selectedDiet, dietId]);
    }
  };
  
  const handleAllergenToggle = (allergenId: string) => {
    if (allergies.includes(allergenId)) {
      setAllergies(allergies.filter(id => id !== allergenId));
    } else {
      setAllergies([...allergies, allergenId]);
    }
  };
  
  const handleReligiousDietSelect = (dietId: string) => {
    setReligiousDiet(religiousDiet === dietId ? null : dietId);
  };
  
  const handleSave = () => {
    toast({
      title: "Preferences Saved",
      description: "Your dietary preferences have been updated successfully.",
    });
  };
  
  return (
    <PageContainer header={{ title: 'Dietary Preferences', showBackButton: true }}>
      <div className="space-y-6 pb-6 px-4">
        <section>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Diet Type</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {dietTypes.map((diet) => (
                    <div key={diet.id} className="flex items-center justify-between">
                      <div>
                        <Label 
                          htmlFor={`diet-${diet.id}`} 
                          className="font-medium cursor-pointer"
                        >
                          {diet.name}
                        </Label>
                        <p className="text-sm text-gray-500">{diet.description}</p>
                      </div>
                      <Switch 
                        id={`diet-${diet.id}`} 
                        checked={selectedDiet.includes(diet.id)}
                        onCheckedChange={() => handleDietToggle(diet.id)}
                      />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Allergies & Intolerances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commonAllergens.map((allergen) => (
                  <div key={allergen.id} className="flex items-center justify-between">
                    <Label 
                      htmlFor={`allergen-${allergen.id}`} 
                      className="font-medium cursor-pointer"
                    >
                      {allergen.name}
                    </Label>
                    <Switch 
                      id={`allergen-${allergen.id}`}
                      checked={allergies.includes(allergen.id)}
                      onCheckedChange={() => handleAllergenToggle(allergen.id)}
                    />
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-md flex items-start">
                <Info size={18} className="text-blue-500 mr-2 mt-0.5" />
                <p className="text-sm text-blue-700">
                  Recipes containing your allergens will be clearly marked with warnings.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Religious Dietary Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {religiousDiets.map((diet) => (
                  <div
                    key={diet.id}
                    className={`p-3 border rounded-md flex items-center justify-between cursor-pointer ${
                      religiousDiet === diet.id ? 'border-wasfah-bright-teal bg-wasfah-bright-teal/5' : 'border-gray-200'
                    }`}
                    onClick={() => handleReligiousDietSelect(diet.id)}
                  >
                    <span className="font-medium">{diet.name}</span>
                    {religiousDiet === diet.id && (
                      <Check size={18} className="text-wasfah-bright-teal" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <ChefTipCard
            tip="Setting your dietary preferences helps us recommend recipes tailored to your needs and restrictions."
            chefName="Chef Aria"
          />
          
          <Button 
            className="w-full mt-4 bg-wasfah-bright-teal hover:bg-wasfah-teal"
            onClick={handleSave}
          >
            Save Preferences
          </Button>
        </section>
      </div>
    </PageContainer>
  );
}
