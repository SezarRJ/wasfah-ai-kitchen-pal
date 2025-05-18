
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ChefAvatar } from '@/components/chef-avatar/ChefAvatar';
import { ChefTipCard } from '@/components/chef-avatar/ChefTipCard';
import { ChefHat, Award, Star, Utensils, Clock, BookOpen } from 'lucide-react';

const ChefAvatarPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock chef data
  const chefData = {
    name: 'Chef Alex',
    level: 5,
    experience: 340,
    nextLevelExperience: 500,
    personality: 'Creative',
    avatarUrl: '/placeholder.svg',
    preferences: ['Italian', 'Mediterranean', 'Spicy'],
    achievements: [
      { id: '1', title: 'Recipe Master', description: 'Created 10 recipes', icon: <ChefHat size={16} /> },
      { id: '2', title: 'Social Cook', description: 'Shared 5 recipes', icon: <Star size={16} /> },
      { id: '3', title: 'Quick Learner', description: 'Followed 20 recipes', icon: <BookOpen size={16} /> },
    ],
    stats: {
      recipesCreated: 12,
      recipesFollowed: 38,
      favoriteCuisine: 'Italian',
      cookingTime: '2.5 hours/week',
    },
    personalizedTips: [
      { id: '1', text: 'Based on your cooking patterns, try adding more fresh herbs to your pasta dishes.' },
      { id: '2', text: 'You seem to enjoy Mediterranean cuisine. Have you tried cooking with za\'atar?' },
      { id: '3', text: 'For your next dish, consider using olive oil instead of vegetable oil for a richer flavor.' },
    ]
  };
  
  // Available personalities for customization
  const availablePersonalities = [
    'Traditional', 'Adventurous', 'Health-conscious', 'Comfort Food', 
    'Gourmet', 'Speedy Chef', 'Precision', 'Creative'
  ];

  return (
    <PageContainer
      header={{
        title: 'My Chef Avatar',
        showBackButton: true,
      }}
    >
      <div className="space-y-6 pb-20">
        <ChefAvatar 
          name={chefData.name}
          level={chefData.level}
          experience={chefData.experience}
          nextLevelExperience={chefData.nextLevelExperience}
          personality={chefData.personality}
          avatarUrl={chefData.avatarUrl}
        />
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="tips">Chef Tips</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-wasfah-deep-teal flex items-center mb-3">
                    <Utensils size={18} className="mr-2 text-wasfah-bright-teal" />
                    Cooking Style
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {chefData.preferences.map((pref, index) => (
                      <div 
                        key={index} 
                        className="px-3 py-1 bg-wasfah-light-gray rounded-full text-wasfah-deep-teal text-sm"
                      >
                        {pref}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-wasfah-deep-teal flex items-center mb-3">
                    <Award size={18} className="mr-2 text-wasfah-bright-teal" />
                    Achievements
                  </h3>
                  <div className="space-y-3">
                    {chefData.achievements.map((achievement) => (
                      <div key={achievement.id} className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-wasfah-light-gray flex items-center justify-center mr-3 text-wasfah-bright-teal">
                          {achievement.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{achievement.title}</h4>
                          <p className="text-xs text-gray-500">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-wasfah-deep-teal flex items-center mb-3">
                    <Clock size={18} className="mr-2 text-wasfah-bright-teal" />
                    Cooking Stats
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Recipes Created</p>
                      <p className="font-semibold">{chefData.stats.recipesCreated}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Recipes Followed</p>
                      <p className="font-semibold">{chefData.stats.recipesFollowed}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Favorite Cuisine</p>
                      <p className="font-semibold">{chefData.stats.favoriteCuisine}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Average Cooking Time</p>
                      <p className="font-semibold">{chefData.stats.cookingTime}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="tips">
            <div className="space-y-4">
              {chefData.personalizedTips.map((tip) => (
                <ChefTipCard 
                  key={tip.id} 
                  tip={tip.text} 
                  chefName={chefData.name} 
                />
              ))}
              
              <Button className="w-full bg-wasfah-deep-teal hover:bg-wasfah-deep-teal/90">
                Get More Personalized Tips
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="customize">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-wasfah-deep-teal mb-3">Change Chef Personality</h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {availablePersonalities.map((personality, index) => (
                    <Button 
                      key={index}
                      variant={personality === chefData.personality ? "default" : "outline"}
                      className={personality === chefData.personality ? 
                        "bg-wasfah-bright-teal hover:bg-wasfah-teal" : 
                        "border-wasfah-bright-teal text-wasfah-deep-teal"}
                    >
                      {personality}
                    </Button>
                  ))}
                </div>
                
                <h3 className="font-semibold text-wasfah-deep-teal mb-3">Chef Name</h3>
                <div className="flex space-x-2 mb-4">
                  <input 
                    type="text" 
                    className="flex-1 px-3 py-2 border rounded-md"
                    value={chefData.name}
                    readOnly
                  />
                  <Button className="bg-wasfah-bright-teal hover:bg-wasfah-teal">
                    Change
                  </Button>
                </div>
                
                <h3 className="font-semibold text-wasfah-deep-teal mb-3">Chef Avatar</h3>
                <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-md mb-4">
                  <div className="text-center">
                    <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-wasfah-bright-teal mx-auto mb-3">
                      <img src={chefData.avatarUrl} alt={chefData.name} className="h-full w-full object-cover" />
                    </div>
                    <Button className="bg-wasfah-bright-teal hover:bg-wasfah-teal">
                      Upload Photo
                    </Button>
                  </div>
                </div>
                
                <Button className="w-full bg-wasfah-deep-teal hover:bg-wasfah-deep-teal/90">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default ChefAvatarPage;
