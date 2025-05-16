
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { mockUser } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Settings, 
  Utensils,
  Globe,
  AlertTriangle,
  ChefHat,
  BarChart3,
  Bell,
  CreditCard,
  Lock
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('');
  };

  return (
    <PageContainer
      header={{
        title: 'Profile',
        actions: (
          <Button variant="ghost" size="icon" className="text-wasfah-deep-teal">
            <Settings size={20} />
          </Button>
        ),
      }}
    >
      <div className="container px-4 py-4">
        <Card className="mb-6">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <Avatar className="h-16 w-16 bg-wasfah-bright-teal text-white">
                <AvatarFallback className="text-lg">
                  {getInitials(mockUser.name)}
                </AvatarFallback>
              </Avatar>
            </div>
            <h2 className="text-xl font-bold text-wasfah-deep-teal">{mockUser.name}</h2>
            <p className="text-sm text-wasfah-bright-teal font-medium">
              {mockUser.isPremium ? 'Premium User' : 'Free User'}
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 flex items-center">
              <Utensils size={18} className="text-wasfah-bright-teal mr-3" />
              <div>
                <h3 className="font-medium text-wasfah-deep-teal">Dietary Preferences</h3>
                <p className="text-sm text-gray-600">
                  {mockUser.dietaryPreferences.join(', ')}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center">
              <Globe size={18} className="text-wasfah-bright-teal mr-3" />
              <div>
                <h3 className="font-medium text-wasfah-deep-teal">Cuisine Preferences</h3>
                <p className="text-sm text-gray-600">
                  {mockUser.cuisinePreferences.join(', ')}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center">
              <AlertTriangle size={18} className="text-wasfah-bright-teal mr-3" />
              <div>
                <h3 className="font-medium text-wasfah-deep-teal">Allergens</h3>
                <p className="text-sm text-gray-600">
                  {mockUser.allergens.join(', ')}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center">
              <ChefHat size={18} className="text-wasfah-bright-teal mr-3" />
              <div>
                <h3 className="font-medium text-wasfah-deep-teal">Chef Personality</h3>
                <p className="text-sm text-gray-600">
                  {mockUser.chefAvatar}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center">
              <BarChart3 size={18} className="text-wasfah-bright-teal mr-3" />
              <div>
                <h3 className="font-medium text-wasfah-deep-teal">Nutritional Goals</h3>
                <p className="text-sm text-gray-600">
                  Protein: {mockUser.nutritionalGoals.protein}g, 
                  Calories: {mockUser.nutritionalGoals.calories}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-4">
          <Button variant="ghost" className="w-full justify-start text-wasfah-deep-teal">
            <Bell size={18} className="mr-3" />
            Notifications
          </Button>
          
          <Button variant="ghost" className="w-full justify-start text-wasfah-deep-teal">
            <CreditCard size={18} className="mr-3" />
            Subscription
          </Button>
          
          <Button variant="ghost" className="w-full justify-start text-wasfah-deep-teal">
            <Lock size={18} className="mr-3" />
            Privacy & Data
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
