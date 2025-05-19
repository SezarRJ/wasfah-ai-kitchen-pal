
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChefAvatarDisplay } from '@/components/chef-avatar/ChefAvatarDisplay';
import { ChefTipCard } from '@/components/chef-avatar/ChefTipCard';
import { ChefPersonality } from '@/types';
import { Book, ChefHat, Sparkles, Target, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Mock chef tips
const mockChefTips = [
  "Try adding a splash of vinegar when poaching eggs to help them keep their shape.",
  "Use a wooden spoon to check if your oil is hot enough for frying - if bubbles form around it, the oil is ready.",
  "Let meat rest for a few minutes after cooking to allow juices to redistribute.",
  "Toast your spices before using them to enhance their flavor.",
  "When making dough, always use cold butter for a flakier texture."
];

// Mock personalities
const personalities: ChefPersonality[] = [
  'Traditional', 'Adventurous', 'Health-conscious', 'Comfort Food', 
  'Gourmet', 'Speedy Chef', 'Precision', 'Creative'
];

// Mock learning patterns
const learningPatterns = [
  { name: 'Cuisine patterns', description: 'Preferences for specific cuisines (Italian, Thai, Mexican, etc.)' },
  { name: 'Ingredient affinities', description: 'Frequently used or highly rated ingredients' },
  { name: 'Cooking method preferences', description: 'Preferred techniques (baking, grilling, stir-frying)' },
  { name: 'Complexity comfort', description: 'Skill level and comfort with recipe complexity' },
  { name: 'Health consciousness', description: 'Patterns related to nutritional choices' }
];

export default function ChefAvatarPage() {
  const { toast } = useToast();
  
  const handleApplyTip = (tip: string) => {
    toast({
      title: "Tip Saved",
      description: "Cooking tip saved to your favorites."
    });
  };
  
  return (
    <PageContainer header={{ title: 'Chef Avatar', showBackButton: true }}>
      <div className="space-y-6 pb-24">
        {/* Chef Avatar */}
        <ChefAvatarDisplay 
          name="Chef Alex"
          level={5}
          experience={340}
          nextLevelExperience={500}
          personality="Creative"
          avatarUrl="/placeholder.svg"
          achievements={[
            { id: '1', title: 'Recipe Master', icon: <Book size={14} /> },
            { id: '2', title: 'Social Cook', icon: <ChefHat size={14} /> }
          ]}
        />
        
        <Tabs defaultValue="model">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="model">Chef Model</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="personalization">Engine</TabsTrigger>
          </TabsList>
          
          <TabsContent value="model" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-wasfah-deep-teal">Chef Avatar Model</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Personality</h3>
                  <div className="flex flex-wrap gap-2">
                    {personalities.map((personality) => (
                      <div 
                        key={personality}
                        className={`px-3 py-1 rounded-full text-sm ${
                          personality === 'Creative' 
                            ? 'bg-wasfah-bright-teal text-white' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {personality}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Experience System</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Your chef gains experience through various cooking activities:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    <li>Completing recipes: +10-50 XP</li>
                    <li>Sharing your creations: +15 XP</li>
                    <li>Getting likes on recipes: +5 XP each</li>
                    <li>Creating original recipes: +100 XP</li>
                    <li>Using ingredient substitutions: +5 XP</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Preferences</h3>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Favorite cuisines:</span> Italian, Japanese, Mediterranean
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Preferred cooking methods:</span> Grilling, Baking
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Favorite ingredients:</span> Garlic, Olive oil, Fresh herbs
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <ChefTipCard 
              tip={mockChefTips[0]}
              chefName="Chef Alex"
              personality="Creative"
              onApply={handleApplyTip}
            />
          </TabsContent>
          
          <TabsContent value="learning" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-wasfah-deep-teal">Learning System</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Your chef avatar learns from your cooking habits and preferences over time,
                  creating a personalized cooking assistant that understands your unique style.
                </p>
                
                <div className="space-y-3">
                  <h3 className="font-semibold">Learning Patterns</h3>
                  
                  {learningPatterns.map((pattern, index) => (
                    <Card key={index} className="p-3 border-wasfah-bright-teal/20">
                      <div className="flex items-start">
                        {index === 0 && <Target size={18} className="mr-2 text-wasfah-bright-teal mt-0.5" />}
                        {index === 1 && <Sparkles size={18} className="mr-2 text-wasfah-bright-teal mt-0.5" />}
                        {index === 2 && <ChefHat size={18} className="mr-2 text-wasfah-bright-teal mt-0.5" />}
                        {index === 3 && <Award size={18} className="mr-2 text-wasfah-bright-teal mt-0.5" />}
                        {index === 4 && <Book size={18} className="mr-2 text-wasfah-bright-teal mt-0.5" />}
                        <div>
                          <h4 className="font-medium text-sm">{pattern.name}</h4>
                          <p className="text-xs text-gray-500">{pattern.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Data Sources</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    <li>Recipes you cook</li>
                    <li>Ratings and feedback you provide</li>
                    <li>Modifications you make to recipes</li>
                    <li>Cooking frequency and patterns</li>
                    <li>Ingredient substitutions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <ChefTipCard 
              tip={mockChefTips[1]}
              chefName="Chef Alex"
              personality="Creative"
              onApply={handleApplyTip}
            />
          </TabsContent>
          
          <TabsContent value="personalization" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-wasfah-deep-teal">Personalization Engine</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Based on what your chef avatar learns, it provides personalized assistance
                  that evolves over time as your cooking skills and preferences change.
                </p>
                
                <div>
                  <h3 className="font-semibold mb-2">Personalization Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ChefHat size={18} className="mr-2 text-wasfah-bright-teal mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Adaptive Personality</p>
                        <p className="text-xs text-gray-500">Your chef's personality evolves to match your cooking style</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Sparkles size={18} className="mr-2 text-wasfah-bright-teal mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Personalized Tips</p>
                        <p className="text-xs text-gray-500">Get cooking tips customized to your skill level and interests</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Book size={18} className="mr-2 text-wasfah-bright-teal mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Recipe Recommendations</p>
                        <p className="text-xs text-gray-500">Discover new recipes aligned with your taste preferences</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Target size={18} className="mr-2 text-wasfah-bright-teal mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Technique Improvements</p>
                        <p className="text-xs text-gray-500">Suggestions to enhance your cooking techniques</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Award size={18} className="mr-2 text-wasfah-bright-teal mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Ingredient Discovery</p>
                        <p className="text-xs text-gray-500">New ingredients recommended based on your preferences</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-center">
              <Button className="bg-wasfah-bright-teal hover:bg-wasfah-teal">
                <ChefHat className="mr-2 h-4 w-4" /> Customize Chef Avatar
              </Button>
            </div>
            
            <ChefTipCard 
              tip={mockChefTips[2]}
              chefName="Chef Alex"
              personality="Creative"
              onApply={handleApplyTip}
            />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
