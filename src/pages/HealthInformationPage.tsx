
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChefTipCard } from '@/components/chef-avatar/ChefTipCard';
import { AlertCircle } from 'lucide-react';

// Sample nutrition data for visualization
const dailyNutrition = [
  { name: 'Protein', amount: 75, goal: 100, unit: 'g' },
  { name: 'Carbs', amount: 220, goal: 275, unit: 'g' },
  { name: 'Fat', amount: 65, goal: 80, unit: 'g' },
  { name: 'Fiber', amount: 18, goal: 25, unit: 'g' },
  { name: 'Sugar', amount: 45, goal: 50, unit: 'g' },
];

const weeklyData = [
  { day: 'Mon', calories: 1850, protein: 72, carbs: 200, fat: 62 },
  { day: 'Tue', calories: 2100, protein: 85, carbs: 220, fat: 70 },
  { day: 'Wed', calories: 1950, protein: 78, carbs: 210, fat: 65 },
  { day: 'Thu', calories: 1800, protein: 70, carbs: 190, fat: 60 },
  { day: 'Fri', calories: 2200, protein: 90, carbs: 240, fat: 75 },
  { day: 'Sat', calories: 2300, protein: 95, carbs: 260, fat: 80 },
  { day: 'Sun', calories: 1900, protein: 75, carbs: 205, fat: 63 },
];

// Sample allergens for the user
const userAllergens = ['Peanuts', 'Shellfish', 'Tree Nuts'];

export default function HealthInformationPage() {
  return (
    <PageContainer header={{ title: 'Health Information', showBackButton: true }}>
      <div className="space-y-6 pb-6 px-4">
        <Tabs defaultValue="nutrition">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="nutrition">Nutrition Tracking</TabsTrigger>
            <TabsTrigger value="allergens">Allergen Information</TabsTrigger>
          </TabsList>
          
          <TabsContent value="nutrition">
            <section>
              <h2 className="text-xl font-bold text-wasfah-deep-teal mb-4">Today's Nutrition</h2>
              
              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Daily Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dailyNutrition.map((item) => (
                      <div key={item.name} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{item.name}</span>
                          <span className="text-sm text-gray-500">
                            {item.amount} / {item.goal} {item.unit}
                          </span>
                        </div>
                        <Progress value={(item.amount / item.goal) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Weekly Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="calories" name="Calories" fill="#05BFDB" />
                    </BarChart>
                  </ResponsiveContainer>
                  
                  <div className="mt-4 text-sm text-gray-600">
                    <p>Average Daily Calories: 2,014 kcal</p>
                    <p>Average Daily Protein: 81g</p>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <ChefTipCard 
                  tip="Adding more lean protein to your meals can help you feel fuller for longer and support muscle maintenance."
                  chefName="Chef Aria"
                />
              </div>
            </section>
          </TabsContent>
          
          <TabsContent value="allergens">
            <section>
              <h2 className="text-xl font-bold text-wasfah-deep-teal mb-4">Your Allergen Profile</h2>
              
              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Registered Allergens</CardTitle>
                </CardHeader>
                <CardContent>
                  {userAllergens.length > 0 ? (
                    <div className="space-y-2">
                      {userAllergens.map((allergen) => (
                        <div key={allergen} className="flex items-center p-2 rounded-md bg-red-50 text-red-800">
                          <AlertCircle size={16} className="mr-2" />
                          <span>{allergen}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No allergens have been registered.</p>
                  )}
                  
                  <div className="mt-6">
                    <p className="text-sm text-gray-600">
                      Recipes containing these allergens will be clearly marked with warnings.
                      You can update your allergen information in your profile settings.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Allergen Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    While we do our best to highlight potential allergens in recipes,
                    please always check the ingredients list carefully if you have severe allergies.
                  </p>
                  
                  <h3 className="font-semibold mb-2">Common Allergens We Track:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    <li>Peanuts</li>
                    <li>Tree Nuts</li>
                    <li>Dairy</li>
                    <li>Eggs</li>
                    <li>Fish</li>
                    <li>Shellfish</li>
                    <li>Soy</li>
                    <li>Wheat (Gluten)</li>
                    <li>Sesame</li>
                  </ul>
                </CardContent>
              </Card>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
