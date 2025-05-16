
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Droplet, Moon, Apple } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const calorieData = [
  { name: 'Mon', consumed: 1800, burned: 2200, limit: 2000 },
  { name: 'Tue', consumed: 2100, burned: 2300, limit: 2000 },
  { name: 'Wed', consumed: 1950, burned: 2100, limit: 2000 },
  { name: 'Thu', consumed: 2200, burned: 2400, limit: 2000 },
  { name: 'Fri', consumed: 1700, burned: 2000, limit: 2000 },
  { name: 'Sat', consumed: 2300, burned: 2300, limit: 2000 },
  { name: 'Sun', consumed: 1900, burned: 2100, limit: 2000 },
];

const nutritionData = [
  { name: 'Protein', consumed: 85, goal: 120 },
  { name: 'Carbs', consumed: 230, goal: 250 },
  { name: 'Fat', consumed: 50, goal: 70 },
  { name: 'Fiber', consumed: 15, goal: 25 },
];

export default function HealthTrackingPage() {
  return (
    <PageContainer header={{ title: 'Health Tracking', showBackButton: true }}>
      <div className="space-y-6 pb-6">
        <section>
          <h2 className="text-xl font-bold text-wasfah-deep-teal mb-4">Today's Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="py-3">
                <div className="flex items-center">
                  <Activity className="h-5 w-5 text-wasfah-bright-teal mr-2" />
                  <CardTitle className="text-base">Calories</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="py-3">
                <div className="text-2xl font-bold">1,450 / 2,000</div>
                <Progress value={72.5} className="h-2 mt-2" />
                <div className="text-xs text-gray-500 mt-1">550 calories remaining</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-3">
                <div className="flex items-center">
                  <Droplet className="h-5 w-5 text-blue-500 mr-2" />
                  <CardTitle className="text-base">Water</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="py-3">
                <div className="text-2xl font-bold">1.2 / 2.5 L</div>
                <Progress value={48} className="h-2 mt-2" />
                <div className="text-xs text-gray-500 mt-1">1.3 liters remaining</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-3">
                <div className="flex items-center">
                  <Moon className="h-5 w-5 text-indigo-500 mr-2" />
                  <CardTitle className="text-base">Sleep</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="py-3">
                <div className="text-2xl font-bold">7.5 hrs</div>
                <Progress value={94} className="h-2 mt-2" />
                <div className="text-xs text-gray-500 mt-1">Target: 8 hours</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-3">
                <div className="flex items-center">
                  <Apple className="h-5 w-5 text-red-500 mr-2" />
                  <CardTitle className="text-base">Nutrition</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="py-3">
                <div className="text-2xl font-bold">Good</div>
                <Progress value={85} className="h-2 mt-2" />
                <div className="text-xs text-gray-500 mt-1">More protein needed</div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section>
          <h2 className="text-xl font-bold text-wasfah-deep-teal mb-4">Calorie Trends</h2>
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={calorieData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="consumed" stroke="#05BFDB" name="Calories Consumed" />
                  <Line type="monotone" dataKey="burned" stroke="#088395" name="Calories Burned" />
                  <Line type="monotone" dataKey="limit" stroke="#0A4D68" strokeDasharray="5 5" name="Calorie Limit" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>
        
        <section>
          <h2 className="text-xl font-bold text-wasfah-deep-teal mb-4">Nutrient Intake</h2>
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={nutritionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="consumed" fill="#05BFDB" name="Consumed" />
                  <Bar dataKey="goal" fill="#0A4D68" name="Goal" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>
        
        <Button className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal">
          Log Today's Meal
        </Button>
      </div>
    </PageContainer>
  );
}
