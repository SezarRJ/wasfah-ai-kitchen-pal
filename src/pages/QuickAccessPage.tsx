
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Activity, ArrowLeftRight, ShoppingCart, Target, ChefHat, Globe,
  Heart, History, Share2, CalendarDays, Settings, User, Search, Award, 
  CreditCard, Languages, Bell, Moon, Trash2 } from 'lucide-react';

// Define Home icon component before using it
const Home = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

export default function QuickAccessPage() {
  const mainFeatures = [
    { icon: <Search className="h-6 w-6 text-wasfah-bright-teal" />, label: "Find by Ingredients", path: "/find-by-ingredients" },
    { icon: <Globe className="h-6 w-6 text-wasfah-bright-teal" />, label: "Global Cuisine", path: "/global-cuisine" },
    { icon: <CalendarDays className="h-6 w-6 text-wasfah-deep-teal" />, label: "Meal Plan", path: "/meal-plan" },
    { icon: <ChefHat className="h-6 w-6 text-wasfah-bright-teal" />, label: "Chef Avatar", path: "/chef-avatar" },
    { icon: <Activity className="h-6 w-6 text-wasfah-coral-red" />, label: "Health Tracking", path: "/health-tracking-home" },
    { icon: <ShoppingCart className="h-6 w-6 text-wasfah-deep-teal" />, label: "Pantry", path: "/pantry" },
    { icon: <Share2 className="h-6 w-6 text-wasfah-bright-teal" />, label: "Share Recipes Status", path: "/shared-recipes-tracking" },
    { icon: <Heart className="h-6 w-6 text-red-500" />, label: "Favorites", path: "/favorites" },
  ];
  
  const accountFeatures = [
    { icon: <User className="h-6 w-6 text-gray-600" />, label: "Profile", path: "/profile" },
    { icon: <Award className="h-6 w-6 text-amber-500" />, label: "Loyalty Program", path: "/loyalty" },
    { icon: <ShoppingCart className="h-6 w-6 text-wasfah-deep-teal" />, label: "Shopping List", path: "/shopping-list" },
    { icon: <CreditCard className="h-6 w-6 text-wasfah-bright-teal" />, label: "Subscription", path: "/subscription" },
  ];
  
  const settingsFeatures = [
    { icon: <Languages className="h-6 w-6 text-wasfah-bright-teal" />, label: "Language", path: "/language-settings" },
    { icon: <Bell className="h-6 w-6 text-wasfah-bright-teal" />, label: "Notifications", path: "/settings" },
    { icon: <Moon className="h-6 w-6 text-purple-600" />, label: "Appearance", path: "/settings" },
    { icon: <Settings className="h-6 w-6 text-gray-600" />, label: "Settings", path: "/settings" },
  ];

  return (
    <PageContainer header={{ title: "WasfahAI", showBackButton: false }}>
      <div className="p-4 pb-24 space-y-6">
        <div className="bg-gradient-to-br from-wasfah-bright-teal to-wasfah-deep-teal p-6 rounded-lg text-white text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Welcome to WasfahAI</h1>
          <p className="opacity-90">Your personal cooking assistant</p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-wasfah-deep-teal">Main Features</h2>
          <div className="grid grid-cols-2 gap-3">
            {mainFeatures.map((item, itemIndex) => (
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

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-wasfah-deep-teal">Account</h2>
          <div className="grid grid-cols-2 gap-3">
            {accountFeatures.map((item, itemIndex) => (
              <Link to={item.path} key={itemIndex}>
                <Card className="hover:shadow-md transition-all duration-300">
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

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-wasfah-deep-teal">App Settings</h2>
          <div className="grid grid-cols-2 gap-3">
            {settingsFeatures.map((item, itemIndex) => (
              <Link to={item.path} key={itemIndex}>
                <Card className="hover:shadow-md transition-all duration-300">
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
