
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Globe, Moon, Smartphone, Volume2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { toast } = useToast();
  const [language, setLanguage] = useState('english');
  const [darkMode, setDarkMode] = useState(false);
  const [soundsEnabled, setSoundsEnabled] = useState(true);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [connectedDevices, setConnectedDevices] = useState<string[]>([]);

  useEffect(() => {
    // Mock loading of settings
    const timer = setTimeout(() => {
      // Simulate getting connected devices
      setConnectedDevices(['Kitchen Smart Scale', 'Thermometer']); 
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast({
      title: "Language changed",
      description: value === 'english' ? "Language set to English" : "تم تغيير اللغة إلى العربية",
    });
  };

  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    // Apply dark mode to the document
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    toast({
      title: checked ? "Dark mode enabled" : "Light mode enabled",
    });
  };

  const handleSoundsToggle = (checked: boolean) => {
    setSoundsEnabled(checked);
    toast({
      title: checked ? "Sounds enabled" : "Sounds disabled",
    });
  };

  const handleHapticsToggle = (checked: boolean) => {
    setHapticsEnabled(checked);
    toast({
      title: checked ? "Haptic feedback enabled" : "Haptic feedback disabled",
    });
  };

  const connectNewDevice = () => {
    toast({
      title: "Scanning for devices",
      description: "Please make sure your device is in pairing mode",
    });
  };

  const disconnectDevice = (device: string) => {
    setConnectedDevices(connectedDevices.filter(d => d !== device));
    toast({
      title: "Device disconnected",
      description: `${device} has been disconnected`,
    });
  };

  return (
    <PageContainer
      header={{
        title: 'Settings',
        showBackButton: true,
      }}
    >
      <div className="space-y-6 pb-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-wasfah-deep-teal flex items-center mb-4">
              <Globe className="mr-2 h-5 w-5 text-wasfah-bright-teal" /> Language
            </h3>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="arabic">العربية (Arabic)</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-wasfah-deep-teal flex items-center mb-4">
              <Moon className="mr-2 h-5 w-5 text-wasfah-bright-teal" /> Appearance
            </h3>
            <div className="flex items-center justify-between">
              <label htmlFor="dark-mode" className="text-sm font-medium">
                Dark Mode
              </label>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={handleDarkModeToggle}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-wasfah-deep-teal flex items-center mb-4">
              <Volume2 className="mr-2 h-5 w-5 text-wasfah-bright-teal" /> Sounds & Haptics
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="sounds" className="text-sm font-medium">
                  Sounds
                </label>
                <Switch
                  id="sounds"
                  checked={soundsEnabled}
                  onCheckedChange={handleSoundsToggle}
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="haptics" className="text-sm font-medium">
                  Haptic Feedback
                </label>
                <Switch
                  id="haptics"
                  checked={hapticsEnabled}
                  onCheckedChange={handleHapticsToggle}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-wasfah-deep-teal flex items-center mb-4">
              <Smartphone className="mr-2 h-5 w-5 text-wasfah-bright-teal" /> Connected Devices
            </h3>
            {connectedDevices.length > 0 ? (
              <div className="space-y-3 mb-4">
                {connectedDevices.map((device, index) => (
                  <div key={index} className="flex items-center justify-between bg-wasfah-light-gray p-3 rounded-md">
                    <div>
                      <p className="font-medium text-sm">{device}</p>
                      <p className="text-xs text-gray-500">Connected</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => disconnectDevice(device)}
                    >
                      Disconnect
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm mb-4">No devices connected</p>
            )}
            <Button 
              className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
              onClick={connectNewDevice}
            >
              Connect a Device
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
