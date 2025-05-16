
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { CircleCheck, Target, ChevronRight, Activity, Utensils, UserCheck } from 'lucide-react';

export default function NutritionGoalsPage() {
  return (
    <PageContainer header={{ title: 'Nutrition Goals', showBackButton: true }}>
      <div className="space-y-6 pb-6">
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Target className="h-6 w-6 text-wasfah-bright-teal mr-2" />
              <h2 className="text-xl font-bold text-wasfah-deep-teal">Your Goals</h2>
            </div>
            <Button variant="ghost" size="sm" className="text-wasfah-bright-teal">
              Edit
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Daily Calorie Target</span>
                    <span className="font-semibold">2,000 kcal</span>
                  </div>
                  <Slider defaultValue={[75]} disabled className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Protein</span>
                    <span className="font-semibold">120g (24%)</span>
                  </div>
                  <Slider defaultValue={[24]} disabled className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Carbohydrates</span>
                    <span className="font-semibold">250g (50%)</span>
                  </div>
                  <Slider defaultValue={[50]} disabled className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Fat</span>
                    <span className="font-semibold">65g (26%)</span>
                  </div>
                  <Slider defaultValue={[26]} disabled className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Water</span>
                    <span className="font-semibold">2.5 L</span>
                  </div>
                  <Slider defaultValue={[75]} disabled className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        
        <section>
          <Tabs defaultValue="goals">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="goals">Goals</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="restrictions">Restrictions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="goals" className="mt-4 space-y-4">
              <Card className="overflow-hidden">
                <CardHeader className="bg-wasfah-light-gray py-3 px-4">
                  <CardTitle className="text-base text-wasfah-deep-teal">Goal Type</CardTitle>
                </CardHeader>
                
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center">
                        <Activity className="h-5 w-5 text-wasfah-bright-teal mr-3" />
                        <div>
                          <div className="font-medium">Weight Loss</div>
                          <div className="text-sm text-gray-600">Reduce 0.5 kg per week</div>
                        </div>
                      </div>
                      <CircleCheck className="h-5 w-5 text-wasfah-bright-teal" />
                    </div>
                    
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center">
                        <UserCheck className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="font-medium">Maintain Weight</div>
                          <div className="text-sm text-gray-600">Keep current weight</div>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-300" />
                    </div>
                    
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center">
                        <Utensils className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="font-medium">Weight Gain</div>
                          <div className="text-sm text-gray-600">Gain 0.25 kg per week</div>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-300" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-wasfah-light-gray py-3 px-4">
                  <CardTitle className="text-base text-wasfah-deep-teal">Body Measurements</CardTitle>
                </CardHeader>
                
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Weight (kg)</label>
                      <Input type="number" value="70" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Height (cm)</label>
                      <Input type="number" value="175" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Age</label>
                      <Input type="number" value="32" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Activity Level</label>
                      <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm mt-1">
                        <option>Moderate</option>
                        <option>Sedentary</option>
                        <option>Light</option>
                        <option>Active</option>
                        <option>Very Active</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences" className="mt-4">
              <Card>
                <CardHeader className="bg-wasfah-light-gray py-3 px-4">
                  <CardTitle className="text-base text-wasfah-deep-teal">Dietary Preferences</CardTitle>
                </CardHeader>
                
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {['Vegetarian', 'High Protein', 'Low Carb', 'Mediterranean', 'Keto'].map((pref) => (
                      <div key={pref} className="flex items-center space-x-2">
                        <Checkbox id={`pref-${pref}`} />
                        <label htmlFor={`pref-${pref}`} className="text-sm font-medium">{pref}</label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="restrictions" className="mt-4">
              <Card>
                <CardHeader className="bg-wasfah-light-gray py-3 px-4">
                  <CardTitle className="text-base text-wasfah-deep-teal">Allergies & Restrictions</CardTitle>
                </CardHeader>
                
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {['Gluten', 'Dairy', 'Tree Nuts', 'Shellfish', 'Eggs', 'Soy'].map((allergy) => (
                      <div key={allergy} className="flex items-center space-x-2">
                        <Checkbox id={`allergy-${allergy}`} />
                        <label htmlFor={`allergy-${allergy}`} className="text-sm font-medium">{allergy}</label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
        
        <Button className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal">
          Save Changes
        </Button>
      </div>
    </PageContainer>
  );
}
