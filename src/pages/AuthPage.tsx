
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WasfahLogo } from '@/components/icons/WasfahLogo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AuthPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating login process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login successful",
        description: "Welcome back to WasfahAI!",
      });
      navigate('/');
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating registration process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Registration successful",
        description: "Welcome to WasfahAI!",
      });
      navigate('/');
    }, 1000);
  };

  const handleSkip = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-wasfah-light-gray flex flex-col">
      <div className="h-1/3 bg-wasfah-deep-teal flex items-center justify-center">
        <WasfahLogo className="text-white" />
      </div>
      
      <div className="flex-1 px-4 py-6">
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login" className="text-lg">Login</TabsTrigger>
            <TabsTrigger value="register" className="text-lg">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-4">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    type="email" 
                    placeholder="Email" 
                    className="pl-10" 
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    type="password" 
                    placeholder="Password" 
                    className="pl-10" 
                    required
                  />
                </div>
                <div className="text-right">
                  <Button variant="link" className="text-sm text-wasfah-bright-teal p-0">
                    Forgot password?
                  </Button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register" className="mt-4">
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    type="text" 
                    placeholder="Full Name" 
                    className="pl-10" 
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    type="email" 
                    placeholder="Email" 
                    className="pl-10" 
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    type="password" 
                    placeholder="Password" 
                    className="pl-10" 
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
                disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Register'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 text-center">
          <Button 
            variant="ghost" 
            className="text-gray-500"
            onClick={handleSkip}
          >
            Continue as guest <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
