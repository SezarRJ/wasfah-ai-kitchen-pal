
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NutritionGoals } from '@/components/nutrition/NutritionGoals';
import { NutritionProgressChart } from '@/components/nutrition/NutritionProgressChart';
import { NutritionSummary } from '@/components/nutrition/NutritionSummary';
import { NutritionEntryForm } from '@/components/nutrition/NutritionEntryForm';
import { ChefTipCard } from '@/components/chef-avatar/ChefTipCard';
import { Activity, Scale, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HealthTrackingHomePage() {
  const handleApplyTip = (tip: string) => {
    console.log('Applied tip:', tip);
  };

  return (
    <PageContainer header={{ title: 'Health & Tracking', showBackButton: true }}>
      <div className="space-y-6 pb-20">
        <ChefTipCard 
          tip="Tracking your nutrition regularly helps maintain healthy eating habits and achieve your nutrition goals faster."
          chefName="Chef Alex"
          personality="Health-conscious"
          onApply={handleApplyTip}
        />
        
        <Tabs defaultValue="track">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="track">
              <Activity className="h-4 w-4 mr-1" />
              Track
            </TabsTrigger>
            <TabsTrigger value="goals">
              <Scale className="h-4 w-4 mr-1" />
              Goals
            </TabsTrigger>
            <TabsTrigger value="history">
              <CalendarDays className="h-4 w-4 mr-1" />
              History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="track" className="space-y-4 mt-4">
            <Card>
              <CardContent className="pt-6">
                <NutritionSummary 
                  calories={{consumed: 1450, goal: 2000}}
                  macros={{
                    protein: {consumed: 75, goal: 120},
                    carbs: {consumed: 180, goal: 240},
                    fat: {consumed: 48, goal: 65}
                  }}
                />
              </CardContent>
            </Card>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-wasfah-deep-teal">Add Today's Nutrition</h3>
              <NutritionEntryForm />
            </div>
            
            <div className="flex flex-col gap-2">
              <Link to="/health-tracking">
                <Button className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal">
                  <Activity className="mr-2 h-4 w-4" />
                  Detailed Tracking
                </Button>
              </Link>
              <Link to="/health-information">
                <Button variant="outline" className="w-full border-wasfah-bright-teal text-wasfah-bright-teal">
                  View Health Information
                </Button>
              </Link>
            </div>
          </TabsContent>
          
          <TabsContent value="goals" className="space-y-4 mt-4">
            <Card>
              <CardContent className="pt-6">
                <NutritionGoals />
              </CardContent>
            </Card>
            
            <Link to="/nutrition-goals">
              <Button className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal">
                Update Nutrition Goals
              </Button>
            </Link>
            
            <Link to="/dietary-preferences">
              <Button variant="outline" className="w-full border-wasfah-bright-teal text-wasfah-bright-teal">
                Manage Dietary Preferences
              </Button>
            </Link>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4 mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-wasfah-deep-teal mb-2">Weekly Progress</h3>
                  <NutritionProgressChart />
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-wasfah-deep-teal">Recent Meals</h3>
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Breakfast #{i}</p>
                      <p className="text-xs text-gray-500">Yesterday, 8:30 AM</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-wasfah-bright-teal">450 kcal</p>
                      <p className="text-xs text-gray-500">P: 25g | C: 45g | F: 15g</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Link to="/health-tracking">
              <Button className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal">
                View Complete History
              </Button>
            </Link>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
