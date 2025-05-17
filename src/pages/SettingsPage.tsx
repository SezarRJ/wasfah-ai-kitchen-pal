
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { mockUser } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Bell, Lock, Moon, CreditCard, LogOut, Smartphone, Globe, Volume2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    recipes: true,
    mealPlan: true,
    tips: false,
    promotions: true,
  });

  const [appearance, setAppearance] = useState({
    darkMode: false,
    reducedMotion: false,
    highContrast: false,
  });

  const [privacy, setPrivacy] = useState({
    shareData: true,
    analytics: true,
    locationServices: false,
  });

  const handleSaveChanges = (section: string) => {
    toast.success(`${section} settings saved successfully`);
  };

  const handleLogout = () => {
    toast.info("Logging out...");
    setTimeout(() => navigate('/auth'), 1500);
  };

  return (
    <PageContainer
      header={{
        title: 'Settings',
        showBackButton: true,
        actions: null,
      }}
    >
      <div className="container px-4 py-4">
        <div className="animate-fade-in space-y-6">
          <Tabs defaultValue="notifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="notifications" className="text-xs">Notifications</TabsTrigger>
              <TabsTrigger value="appearance" className="text-xs">Appearance</TabsTrigger>
              <TabsTrigger value="privacy" className="text-xs">Privacy</TabsTrigger>
            </TabsList>
            
            <TabsContent value="notifications" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Bell className="mr-2 h-5 w-5 text-wasfah-bright-teal" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>Manage how and when Wasfah notifies you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="recipe-updates">Recipe Updates</Label>
                        <p className="text-sm text-gray-500">Get notified about new recipes</p>
                      </div>
                      <Switch 
                        id="recipe-updates" 
                        checked={notifications.recipes}
                        onCheckedChange={(checked) => setNotifications({...notifications, recipes: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="meal-plan">Meal Plan Reminders</Label>
                        <p className="text-sm text-gray-500">Reminders for your meal plans</p>
                      </div>
                      <Switch 
                        id="meal-plan" 
                        checked={notifications.mealPlan}
                        onCheckedChange={(checked) => setNotifications({...notifications, mealPlan: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="cooking-tips">Cooking Tips</Label>
                        <p className="text-sm text-gray-500">Weekly cooking tips and tricks</p>
                      </div>
                      <Switch 
                        id="cooking-tips" 
                        checked={notifications.tips}
                        onCheckedChange={(checked) => setNotifications({...notifications, tips: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="promotions">Promotions</Label>
                        <p className="text-sm text-gray-500">Special offers and promotions</p>
                      </div>
                      <Switch 
                        id="promotions" 
                        checked={notifications.promotions}
                        onCheckedChange={(checked) => setNotifications({...notifications, promotions: checked})}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleSaveChanges('Notification')}
                    className="w-full bg-wasfah-bright-teal hover:bg-wasfah-deep-teal transition-colors"
                  >
                    Save Notification Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Moon className="mr-2 h-5 w-5 text-wasfah-bright-teal" />
                    Appearance Settings
                  </CardTitle>
                  <CardDescription>Customize how Wasfah looks for you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="dark-mode">Dark Mode</Label>
                        <p className="text-sm text-gray-500">Use dark theme</p>
                      </div>
                      <Switch 
                        id="dark-mode" 
                        checked={appearance.darkMode}
                        onCheckedChange={(checked) => setAppearance({...appearance, darkMode: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="reduced-motion">Reduced Motion</Label>
                        <p className="text-sm text-gray-500">Minimize animations</p>
                      </div>
                      <Switch 
                        id="reduced-motion" 
                        checked={appearance.reducedMotion}
                        onCheckedChange={(checked) => setAppearance({...appearance, reducedMotion: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="high-contrast">High Contrast</Label>
                        <p className="text-sm text-gray-500">Increase visual contrast</p>
                      </div>
                      <Switch 
                        id="high-contrast" 
                        checked={appearance.highContrast}
                        onCheckedChange={(checked) => setAppearance({...appearance, highContrast: checked})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="font-size">Text Size</Label>
                      <Input 
                        id="font-size" 
                        type="range" 
                        min="80" 
                        max="120" 
                        defaultValue="100" 
                        className="mt-2" 
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs">A</span>
                        <span className="text-lg">A</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleSaveChanges('Appearance')}
                    className="w-full bg-wasfah-bright-teal hover:bg-wasfah-deep-teal transition-colors"
                  >
                    Save Appearance Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Lock className="mr-2 h-5 w-5 text-wasfah-bright-teal" />
                    Privacy Settings
                  </CardTitle>
                  <CardDescription>Manage your data and privacy options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="share-data">Share Usage Data</Label>
                        <p className="text-sm text-gray-500">Help us improve Wasfah</p>
                      </div>
                      <Switch 
                        id="share-data" 
                        checked={privacy.shareData}
                        onCheckedChange={(checked) => setPrivacy({...privacy, shareData: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="analytics">Analytics Cookies</Label>
                        <p className="text-sm text-gray-500">Allow analytics to improve experience</p>
                      </div>
                      <Switch 
                        id="analytics" 
                        checked={privacy.analytics}
                        onCheckedChange={(checked) => setPrivacy({...privacy, analytics: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="location">Location Services</Label>
                        <p className="text-sm text-gray-500">Allow access to your location</p>
                      </div>
                      <Switch 
                        id="location" 
                        checked={privacy.locationServices}
                        onCheckedChange={(checked) => setPrivacy({...privacy, locationServices: checked})}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleSaveChanges('Privacy')}
                    className="w-full bg-wasfah-bright-teal hover:bg-wasfah-deep-teal transition-colors"
                  >
                    Save Privacy Settings
                  </Button>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <Button 
                      variant="outline" 
                      className="w-full text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                      Delete My Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '150ms' }}>
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <CreditCard size={18} className="text-wasfah-bright-teal mr-3" />
                  <div>
                    <h3 className="font-medium text-wasfah-deep-teal">Subscription</h3>
                    <p className="text-sm text-gray-600">
                      {mockUser.isPremium ? 'Premium Plan' : 'Free Plan'}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/subscription')}>
                  Manage
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <Smartphone size={18} className="text-wasfah-bright-teal mr-3" />
                  <div>
                    <h3 className="font-medium text-wasfah-deep-teal">Connected Devices</h3>
                    <p className="text-sm text-gray-600">2 devices</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <Globe size={18} className="text-wasfah-bright-teal mr-3" />
                  <div>
                    <h3 className="font-medium text-wasfah-deep-teal">Language</h3>
                    <p className="text-sm text-gray-600">English (US)</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <Volume2 size={18} className="text-wasfah-bright-teal mr-3" />
                  <div>
                    <h3 className="font-medium text-wasfah-deep-teal">Sounds & Haptics</h3>
                    <p className="text-sm text-gray-600">Customize feedback</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Adjust
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <Button 
            variant="ghost" 
            className="w-full justify-center text-gray-600 hover:bg-gray-100 mt-4"
            onClick={handleLogout}
          >
            <LogOut size={18} className="mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
