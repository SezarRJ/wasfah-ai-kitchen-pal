
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, ArrowLeftRight, ShoppingCart, Target, Plus, ChefHat, History, Heart, Share2 } from 'lucide-react';

export const QuickActionsSection: React.FC = () => {
  const actions = [
    { icon: <Activity className="h-6 w-6 mx-auto text-wasfah-bright-teal" />, label: "Track Health", path: "/health-tracking" },
    { icon: <ArrowLeftRight className="h-6 w-6 mx-auto text-wasfah-bright-teal" />, label: "Swap Ingredients", path: "/ingredient-swap" },
    { icon: <ShoppingCart className="h-6 w-6 mx-auto text-wasfah-bright-teal" />, label: "Shopping List", path: "/shopping-list" },
    { icon: <Target className="h-6 w-6 mx-auto text-wasfah-bright-teal" />, label: "Set Goals", path: "/nutrition-goals" },
  ];

  const historyFavoritesActions = [
    { icon: <Heart className="h-6 w-6 mx-auto text-wasfah-coral-red" />, label: "Favorites", path: "/favorites" },
    { icon: <History className="h-6 w-6 mx-auto text-wasfah-bright-teal" />, label: "History", path: "/history" },
    { icon: <ChefHat className="h-6 w-6 mx-auto text-wasfah-deep-teal" />, label: "Chef Avatar", path: "/chef-avatar" },
    { icon: <Share2 className="h-6 w-6 mx-auto text-wasfah-bright-teal" />, label: "Share Recipe", path: "/share-recipe" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-wasfah-deep-teal">Quick Actions</h2>
      
      <div className="grid grid-cols-4 gap-2">
        {actions.map((action, index) => (
          <Link to={action.path} key={action.path}>
            <Card 
              className="text-center p-2 hover:shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-gray-50" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-1 animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                {action.icon}
                <div className="text-xs mt-1 font-medium">{action.label}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      <h2 className="text-lg font-bold text-wasfah-deep-teal">Favorites & History</h2>
      
      <div className="grid grid-cols-4 gap-2">
        {historyFavoritesActions.map((action, index) => (
          <Link to={action.path} key={action.path}>
            <Card 
              className="text-center p-2 hover:shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-gray-50" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-1 animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                {action.icon}
                <div className="text-xs mt-1 font-medium">{action.label}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
