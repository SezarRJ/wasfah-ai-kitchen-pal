
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { User, Award, ShoppingCart, CreditCard, Languages, Bell, Moon, 
  Settings } from 'lucide-react';
import { SignOut } from '@/components/auth/SignOut';

const MainSettingsPage = () => {
  const accountFeatures = [
    { icon: <User className="h-6 w-6 text-gray-600" />, label: "Profile", path: "/profile" },
    { icon: <Award className="h-6 w-6 text-amber-500" />, label: "Loyalty Program", path: "/loyalty" },
    { icon: <ShoppingCart className="h-6 w-6 text-wasfah-deep-teal" />, label: "Shopping List", path: "/shopping-list" },
    { icon: <CreditCard className="h-6 w-6 text-wasfah-bright-teal" />, label: "Payment Methods", path: "/subscription" },
  ];
  
  const settingsFeatures = [
    { icon: <Languages className="h-6 w-6 text-wasfah-bright-teal" />, label: "Language", path: "/language-settings" },
    { icon: <Bell className="h-6 w-6 text-wasfah-bright-teal" />, label: "Notifications", path: "/settings" },
    { icon: <Moon className="h-6 w-6 text-purple-600" />, label: "Appearance", path: "/settings" },
    { icon: <Settings className="h-6 w-6 text-gray-600" />, label: "Settings", path: "/settings" },
  ];

  return (
    <PageContainer header={{ title: "Settings", showBackButton: true }}>
      <div className="p-4 pb-24 space-y-6">
        <div className="bg-gradient-to-br from-wasfah-bright-teal to-wasfah-deep-teal p-6 rounded-lg text-white text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Settings</h1>
          <p className="opacity-90">Customize your WasfahAI experience</p>
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
        
        {/* Sign Out Button */}
        <div className="pt-4">
          <SignOut />
        </div>
      </div>
    </PageContainer>
  );
};

export default MainSettingsPage;
