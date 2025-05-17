
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, ArrowLeftRight, ShoppingCart, Target } from 'lucide-react';

export const QuickActionsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-2">
      <Link to="/health-tracking">
        <Card className="text-center p-2 hover:shadow-md transition-all">
          <CardContent className="p-1">
            <Activity className="h-6 w-6 mx-auto text-wasfah-bright-teal" />
            <div className="text-xs mt-1 font-medium">Track Health</div>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/ingredient-swap">
        <Card className="text-center p-2 hover:shadow-md transition-all">
          <CardContent className="p-1">
            <ArrowLeftRight className="h-6 w-6 mx-auto text-wasfah-bright-teal" />
            <div className="text-xs mt-1 font-medium">Swap Ingredients</div>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/shopping-list">
        <Card className="text-center p-2 hover:shadow-md transition-all">
          <CardContent className="p-1">
            <ShoppingCart className="h-6 w-6 mx-auto text-wasfah-bright-teal" />
            <div className="text-xs mt-1 font-medium">Shopping List</div>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/nutrition-goals">
        <Card className="text-center p-2 hover:shadow-md transition-all">
          <CardContent className="p-1">
            <Target className="h-6 w-6 mx-auto text-wasfah-bright-teal" />
            <div className="text-xs mt-1 font-medium">Set Goals</div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};
