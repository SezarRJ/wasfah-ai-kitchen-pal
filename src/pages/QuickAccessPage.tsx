
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Activity, ArrowLeftRight, ShoppingCart, Target, ChefHat, Globe,
  Heart, History, Share2, CalendarDays, Settings, User, Search, Award, 
  CreditCard, Languages } from 'lucide-react';

export default function QuickAccessPage() {
  const featureSections = [
    {
      title: "Main Features",
      items: [
        { icon: <ChefHat className="h-6 w-6 text-wasfah-bright-teal" />, label: "Chef Avatar", path: "/chef-avatar" },
        { icon: <Globe className="h-6 w-6 text-wasfah-bright-teal" />, label: "Global Cuisine", path: "/global-cuisine" },
        { icon: <Share2 className="h-6 w-6 text-wasfah-bright-teal" />, label: "Share Recipes", path: "/shared-recipes-tracking" },
        { icon: <Award className="h-6 w-6 text-wasfah-bright-teal" />, label: "Loyalty Program", path: "/loyalty" },
      ]
    },
    {
      title: "Plan & Organize",
      items: [
        { icon: <CalendarDays className="h-6 w-6 text-wasfah-deep-teal" />, label: "Meal Plan", path: "/meal-plan" },
        { icon: <ShoppingCart className="h-6 w-6 text-wasfah-deep-teal" />, label: "Pantry", path: "/pantry" },
        { icon: <ShoppingCart className="h-6 w-6 text-wasfah-deep-teal" />, label: "Shopping List", path: "/shopping-list" },
        { icon: <Search className="h-6 w-6 text-wasfah-deep-teal" />, label: "Find by Ingredients", path: "/find-by-ingredients" },
      ]
    },
    {
      title: "Health & Tracking",
      items: [
        { icon: <Activity className="h-6 w-6 text-wasfah-coral-red" />, label: "Health Tracking", path: "/health-tracking-home" },
        { icon: <Target className="h-6 w-6 text-wasfah-coral-red" />, label: "Set Goals", path: "/nutrition-goals" },
        { icon: <ArrowLeftRight className="h-6 w-6 text-wasfah-coral-red" />, label: "Ingredient Swap", path: "/ingredient-swap" },
      ]
    },
    {
      title: "My Collection",
      items: [
        { icon: <Heart className="h-6 w-6 text-wasfah-coral-red" />, label: "Saved Recipes", path: "/favorites" },
        { icon: <History className="h-6 w-6 text-wasfah-bright-teal" />, label: "History", path: "/history" },
      ]
    },
    {
      title: "Account & Payments",
      items: [
        { icon: <CreditCard className="h-6 w-6 text-wasfah-bright-teal" />, label: "Subscription", path: "/subscription" },
        { icon: <Languages className="h-6 w-6 text-wasfah-bright-teal" />, label: "Language", path: "/language-settings" },
        { icon: <Settings className="h-6 w-6 text-gray-600" />, label: "Settings", path: "/settings" },
        { icon: <User className="h-6 w-6 text-gray-600" />, label: "Profile", path: "/profile" },
      ]
    }
  ];

  return (
    <PageContainer header={{ title: "Quick Access", showBackButton: true }}>
      <div className="p-4 pb-24 space-y-6">
        {featureSections.map((section, index) => (
          <div key={index} className="space-y-3">
            <h2 className="text-lg font-bold text-wasfah-deep-teal">{section.title}</h2>
            <div className="grid grid-cols-2 gap-3">
              {section.items.map((item, itemIndex) => (
                <Link to={item.path} key={itemIndex}>
                  <Card className="hover:shadow-md transition-all duration-300 transform hover:scale-105">
                    <CardContent className="p-4 flex items-center space-x-3">
                      <div className="rounded-full p-2 bg-gray-50 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Admin Panel Link */}
        <div className="pt-4">
          <Link to="/admin/login">
            <Card className="bg-gray-50 hover:bg-gray-100 transition-colors">
              <CardContent className="p-4 flex items-center justify-center space-x-2">
                <Settings className="h-5 w-5 text-gray-700" />
                <span className="font-medium text-gray-700">Admin Panel</span>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
