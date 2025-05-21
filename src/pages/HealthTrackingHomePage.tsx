
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NutritionGoals } from '@/components/nutrition/NutritionGoals';
import { NutritionProgressChart } from '@/components/nutrition/NutritionProgressChart';
import { NutritionSummary } from '@/components/nutrition/NutritionSummary';
import { NutritionEntryForm } from '@/components/nutrition/NutritionEntryForm';
import { NutritionTip } from '@/components/nutrition/NutritionTip';
import { Activity, Scale, CalendarDays, ArrowLeftRight, Tag, Brain, Award, Heart, Calculator, ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export default function HealthTrackingHomePage() {
  const [isHealthGoalsOpen, setIsHealthGoalsOpen] = useState(false);
  const [userWeight, setUserWeight] = useState(70); // in kg
  const [userHeight, setUserHeight] = useState(170); // in cm
  const [userTargetWeight, setUserTargetWeight] = useState(65); // in kg
  
  // Calculate BMI
  const bmi = userWeight / ((userHeight / 100) * (userHeight / 100));
  const bmiCategory = 
    bmi < 18.5 ? "Underweight" :
    bmi < 25 ? "Healthy" :
    bmi < 30 ? "Overweight" : "Obese";
  
  // Calculate weight loss progress
  const initialWeight = 75; // starting weight
  const weightLossGoal = initialWeight - userTargetWeight;
  const currentProgress = initialWeight - userWeight;
  const progressPercentage = (currentProgress / weightLossGoal) * 100;
  
  const handleApplyTip = (tip: string) => {
    console.log('Applied tip:', tip);
  };

  // Mock data for nutrition progress chart
  const mockNutritionData = [
    { date: 'Mon', calories: 1800, protein: 85, carbs: 210, fat: 55 },
    { date: 'Tue', calories: 2100, protein: 95, carbs: 240, fat: 60 },
    { date: 'Wed', calories: 1950, protein: 90, carbs: 225, fat: 58 },
    { date: 'Thu', calories: 2000, protein: 92, carbs: 230, fat: 59 },
    { date: 'Fri', calories: 1900, protein: 88, carbs: 220, fat: 57 },
    { date: 'Sat', calories: 2200, protein: 100, carbs: 250, fat: 62 },
    { date: 'Sun', calories: 1850, protein: 86, carbs: 215, fat: 56 },
  ];

  const handleNutritionSubmit = (data: {
    date: Date;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    mealType: string;
  }) => {
    console.log('Nutrition data submitted:', data);
    // Here you would typically save the data or update state
  };

  // Mock ingredient swap data
  const ingredientSwaps = [
    {
      original: 'Butter',
      alternatives: [
        { name: 'Olive Oil', benefits: 'Heart-healthy fats, less saturated fat', ratio: '3/4 cup for 1 cup butter' },
        { name: 'Greek Yogurt', benefits: 'Lower fat, higher protein', ratio: '1/2 cup for 1 cup butter' },
        { name: 'Applesauce', benefits: 'No fat, adds moisture', ratio: '1 cup for 1 cup butter' }
      ]
    },
    {
      original: 'Sugar',
      alternatives: [
        { name: 'Honey', benefits: 'Natural sweetener, contains antioxidants', ratio: '3/4 cup for 1 cup sugar' },
        { name: 'Maple Syrup', benefits: 'Contains minerals, lower glycemic index', ratio: '3/4 cup for 1 cup sugar' },
        { name: 'Stevia', benefits: 'Zero calories, natural sweetener', ratio: '1 tsp for 1 cup sugar' }
      ]
    },
    {
      original: 'White Flour',
      alternatives: [
        { name: 'Almond Flour', benefits: 'Low carb, high protein, gluten-free', ratio: '1:1 replacement' },
        { name: 'Coconut Flour', benefits: 'High fiber, low carb', ratio: '1/4 cup for 1 cup flour' },
        { name: 'Whole Wheat Flour', benefits: 'More fiber and nutrients', ratio: '1:1 replacement' }
      ]
    }
  ];
  
  // Daily challenges to reduce AI dependency
  const dailyChallenges = [
    { name: "Plan Tomorrow's Meals", description: "Create a meal plan for tomorrow without using AI recommendations", completed: false },
    { name: "Track Manually", description: "Record your meals and exercise without automated tracking for a day", completed: true },
    { name: "Set Personal Goals", description: "Define one health goal based on your own research and knowledge", completed: false }
  ];

  return (
    <PageContainer header={{ title: 'Health & Tracking', showBackButton: true }}>
      <div className="space-y-6 pb-20">
        <NutritionTip 
          tip="Based on your recent activity and diet patterns, I recommend increasing protein intake by 15g daily while reducing carbs slightly to help reach your weight goal of 65kg."
          source="Wasfah AI"
          onApply={handleApplyTip}
          type="ai"
        />
        
        {/* Health Progress Overview */}
        <Card className="border-2 border-wasfah-bright-teal/20 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-wasfah-light-gray to-wasfah-light-mint/10 dark:from-gray-800 dark:to-gray-800/80 pb-2">
            <CardTitle className="flex items-center text-wasfah-deep-teal dark:text-wasfah-bright-teal">
              <Brain className="h-5 w-5 mr-2" />
              AI Health Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Current BMI</p>
                  <p className="text-xl font-bold">{bmi.toFixed(1)}</p>
                  <p className={`text-sm ${
                    bmiCategory === "Healthy" ? "text-green-500" : 
                    bmiCategory === "Underweight" ? "text-blue-500" : "text-orange-500"
                  }`}>{bmiCategory}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Weight Goal Progress</p>
                  <div className="flex items-center">
                    <p className="text-xl font-bold">{progressPercentage.toFixed(0)}%</p>
                    <Award className={`ml-2 h-5 w-5 ${
                      progressPercentage > 75 ? "text-green-500" :
                      progressPercentage > 50 ? "text-blue-500" :
                      progressPercentage > 25 ? "text-yellow-500" : "text-gray-400"
                    }`} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Starting ({initialWeight}kg)</span>
                  <span>Current ({userWeight}kg)</span>
                  <span>Target ({userTargetWeight}kg)</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
              
              <Collapsible open={isHealthGoalsOpen} onOpenChange={setIsHealthGoalsOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex w-full justify-between">
                    <span className="flex items-center">
                      <Calculator className="h-4 w-4 mr-1" /> Health Metrics Details
                    </span>
                    {isHealthGoalsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <p className="text-gray-500">Height</p>
                      <p className="font-medium">{userHeight} cm</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-500">Current Weight</p>
                      <p className="font-medium">{userWeight} kg</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-500">Target Weight</p>
                      <p className="font-medium">{userTargetWeight} kg</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-500">Recommended Daily Calories</p>
                      <p className="font-medium">2,100 kcal</p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </CardContent>
        </Card>
        
        {/* Daily Challenges to Reduce AI Dependency */}
        <Card className="border-2 border-purple-300/30 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-50/10 dark:from-gray-800 dark:to-gray-800/80 pb-2">
            <CardTitle className="flex items-center text-purple-700 dark:text-purple-400">
              <Award className="h-5 w-5 mr-2" />
              Daily Independence Challenges
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Complete these challenges to become less dependent on AI guidance
            </p>
            <div className="space-y-3">
              {dailyChallenges.map((challenge, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    challenge.completed ? "bg-purple-500 border-purple-500" : "border-gray-300"
                  }`}>
                    {challenge.completed && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-sm">{challenge.name}</p>
                    <p className="text-xs text-gray-500">{challenge.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-purple-500 hover:bg-purple-600 text-white">
              View All Challenges
            </Button>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="track">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="track">
              <Activity className="h-4 w-4 mr-1" />
              Track
            </TabsTrigger>
            <TabsTrigger value="goals">
              <Scale className="h-4 w-4 mr-1" />
              Goals
            </TabsTrigger>
            <TabsTrigger value="swaps">
              <ArrowLeftRight className="h-4 w-4 mr-1" />
              Swaps
            </TabsTrigger>
            <TabsTrigger value="history">
              <CalendarDays className="h-4 w-4 mr-1" />
              History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="track" className="space-y-4 mt-4">
            <Card className="border border-gray-200 dark:border-gray-700">
              <CardContent className="pt-6">
                <NutritionSummary 
                  calories={{consumed: 1450, target: 2000}}
                  protein={{consumed: 75, target: 120}}
                  carbs={{consumed: 180, target: 240}}
                  fat={{consumed: 48, target: 65}}
                />
              </CardContent>
            </Card>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-wasfah-deep-teal dark:text-wasfah-bright-teal">Add Today's Nutrition</h3>
              <NutritionEntryForm onSubmit={handleNutritionSubmit} />
            </div>
            
            <div className="flex flex-col gap-2">
              <Link to="/health-tracking">
                <Button className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal">
                  <Activity className="mr-2 h-4 w-4" />
                  Detailed Tracking
                </Button>
              </Link>
              <Link to="/health-information">
                <Button variant="outline" className="w-full border-wasfah-bright-teal text-wasfah-bright-teal dark:border-wasfah-bright-teal/50">
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
              <Button variant="outline" className="w-full border-wasfah-bright-teal text-wasfah-bright-teal dark:border-wasfah-bright-teal/50">
                Manage Dietary Preferences
              </Button>
            </Link>
          </TabsContent>
          
          <TabsContent value="swaps" className="space-y-4 mt-4">
            <h3 className="text-lg font-semibold text-wasfah-deep-teal dark:text-wasfah-bright-teal">Healthier Ingredient Alternatives</h3>
            <div className="space-y-4">
              {ingredientSwaps.map((swap, index) => (
                <Card key={index} className="border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4">
                    <h4 className="font-bold text-wasfah-deep-teal dark:text-wasfah-bright-teal flex items-center mb-3">
                      <Tag className="h-4 w-4 mr-2" />
                      Instead of <span className="text-wasfah-bright-teal ml-1">{swap.original}</span>, try:
                    </h4>
                    <div className="space-y-3">
                      {swap.alternatives.map((alt, altIdx) => (
                        <div key={altIdx} className="bg-wasfah-light-gray dark:bg-gray-800 p-3 rounded-md">
                          <div className="flex justify-between">
                            <h5 className="font-medium">{alt.name}</h5>
                            <span className="text-xs bg-wasfah-bright-teal text-white px-2 py-0.5 rounded-full">
                              {alt.ratio}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{alt.benefits}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Link to="/ingredient-swap">
              <Button className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal">
                <ArrowLeftRight className="mr-2 h-4 w-4" />
                View All Ingredient Swaps
              </Button>
            </Link>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4 mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-wasfah-deep-teal dark:text-wasfah-bright-teal mb-2">Weekly Progress</h3>
                  <NutritionProgressChart 
                    data={mockNutritionData}
                    type="weekly"
                  />
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-wasfah-deep-teal dark:text-wasfah-bright-teal">Recent Meals</h3>
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border border-gray-200 dark:border-gray-700">
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
        
        {/* Social Sharing for Motivation */}
        <Card className="border-2 border-blue-300/30">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-50/10 dark:from-gray-800 dark:to-gray-800/80 pb-2">
            <CardTitle className="flex items-center text-blue-700 dark:text-blue-400">
              <Heart className="h-5 w-5 mr-2" />
              Share Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Stay motivated by sharing your achievements with friends
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="border-blue-300 text-blue-600 dark:border-blue-500/30 dark:text-blue-400">
                Share Progress
              </Button>
              <Button variant="outline" className="border-blue-300 text-blue-600 dark:border-blue-500/30 dark:text-blue-400">
                Join Challenge
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
