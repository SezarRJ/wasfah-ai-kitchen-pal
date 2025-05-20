
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChefAvatarDisplay } from '@/components/chef-avatar/ChefAvatarDisplay';
import { ChefTipCard } from '@/components/chef-avatar/ChefTipCard';
import { type ChefPersonality } from '@/types';
import { Book, ChefHat, Sparkles, Target, Award, HelpCircle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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

// Chef avatar guide steps
const guideSteps = [
  { 
    title: 'Your Personal Chef',
    content: 'Your Chef Avatar is your personalized AI cooking assistant, designed to learn your preferences and provide tailored recommendations.',
    icon: <ChefHat className="h-8 w-8 text-wasfah-bright-teal" />
  },
  { 
    title: 'Learning Your Style',
    content: 'As you use WasfahAI, your Chef Avatar learns from your interactions, recipes you cook, ratings you provide, and preferences you set.',
    icon: <Target className="h-8 w-8 text-wasfah-bright-teal" />
  },
  { 
    title: 'Growing Together',
    content: 'Your Chef Avatar levels up as you cook more recipes, gaining experience points for various cooking activities.',
    icon: <Award className="h-8 w-8 text-wasfah-bright-teal" />
  },
  { 
    title: 'Personalized Recommendations',
    content: 'Based on what it learns, your Chef Avatar will suggest recipes, techniques, and ingredients that align with your tastes and cooking style.',
    icon: <Sparkles className="h-8 w-8 text-wasfah-bright-teal" />
  },
  { 
    title: 'Customization',
    content: 'You can customize your Chef Avatar\'s personality to match your cooking approach - from traditional to adventurous.',
    icon: <Book className="h-8 w-8 text-wasfah-bright-teal" />
  }
];

export default function ChefAvatarPage() {
  const { toast } = useToast();
  const [showGuide, setShowGuide] = useState(false);
  const [currentGuideStep, setCurrentGuideStep] = useState(0);
  
  const handleApplyTip = (tip: string) => {
    toast({
      title: "Tip Saved",
      description: "Cooking tip saved to your favorites."
    });
  };
  
  const handleGuideNext = () => {
    if (currentGuideStep < guideSteps.length - 1) {
      setCurrentGuideStep(prev => prev + 1);
    } else {
      setShowGuide(false);
      toast({
        title: "Guide Completed",
        description: "You've completed the Chef Avatar guide!"
      });
    }
  };
  
  const handleGuideBack = () => {
    if (currentGuideStep > 0) {
      setCurrentGuideStep(prev => prev - 1);
    }
  };
  
  return (
    <PageContainer header={{ 
      title: 'Chef Avatar', 
      showBackButton: true,
      actions: (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setShowGuide(true)}
        >
          <HelpCircle className="h-5 w-5 text-wasfah-deep-teal" />
        </Button>
      )
    }}>
      <div className="space-y-6 pb-24 px-4">
        {/* Chef Avatar */}
        <ChefAvatarDisplay 
          name="Chef Alex"
          level={5}
          experience={340}
          nextLevelExperience={500}
          personality="Creative"
          avatarUrl="/placeholder.svg"
          achievements={[
            { id: '1', title: "Recipe Master", icon: <Book size={14} /> },
            { id: '2', title: "Social Cook", icon: <ChefHat size={14} /> }
          ]}
        />
        
        <Tabs defaultValue="model">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="model">Profile</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="personalization">Customize</TabsTrigger>
          </TabsList>
          
          <TabsContent value="model" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-wasfah-deep-teal">Chef Avatar Profile</CardTitle>
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
                <CardTitle className="text-lg text-wasfah-deep-teal">Customize Your Chef</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  Personalize your Chef Avatar to enhance your cooking experience and receive more tailored recommendations.
                </p>
                
                <div>
                  <h3 className="font-semibold mb-3">Select Personality</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {personalities.map((personality) => (
                      <div 
                        key={personality}
                        className={`p-3 rounded-md border cursor-pointer ${
                          personality === 'Creative' 
                            ? 'border-wasfah-bright-teal bg-wasfah-bright-teal/5' 
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="font-medium text-sm">{personality}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-semibold mb-3">Chef Avatar Style</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((avatar) => (
                      <div 
                        key={avatar}
                        className={`border rounded-md overflow-hidden cursor-pointer ${
                          avatar === 1 ? 'border-wasfah-bright-teal' : 'border-gray-200'
                        }`}
                      >
                        <div className="h-20 bg-gray-200 flex items-center justify-center">
                          <ChefHat size={28} className="text-gray-400" />
                        </div>
                        <div className="p-2 text-center text-xs">Style {avatar}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button className="w-full mt-2 bg-wasfah-bright-teal hover:bg-wasfah-teal">
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
            
            <ChefTipCard 
              tip={mockChefTips[2]}
              chefName="Chef Alex"
              personality="Creative"
              onApply={handleApplyTip}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Chef Avatar Guide Dialog */}
      <Dialog open={showGuide} onOpenChange={setShowGuide}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Lightbulb className="mr-2 h-5 w-5 text-wasfah-bright-teal" />
              Chef Avatar Guide
            </DialogTitle>
            <DialogDescription>
              Learn how to get the most from your personalized Chef Avatar
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex justify-center mb-6">
              {guideSteps[currentGuideStep].icon}
            </div>
            
            <h3 className="text-lg font-bold text-center mb-2">
              {guideSteps[currentGuideStep].title}
            </h3>
            
            <p className="text-center text-gray-600">
              {guideSteps[currentGuideStep].content}
            </p>
            
            <div className="flex justify-between items-center mt-8">
              <Button 
                variant="outline" 
                onClick={handleGuideBack}
                disabled={currentGuideStep === 0}
              >
                Back
              </Button>
              
              <div className="flex space-x-1">
                {guideSteps.map((_, index) => (
                  <div 
                    key={index} 
                    className={`h-2 w-2 rounded-full ${
                      index === currentGuideStep ? 'bg-wasfah-bright-teal' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <Button onClick={handleGuideNext}>
                {currentGuideStep < guideSteps.length - 1 ? 'Next' : 'Finish'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}
