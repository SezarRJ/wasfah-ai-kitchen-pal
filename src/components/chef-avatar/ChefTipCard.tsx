
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChefHat } from 'lucide-react';

interface ChefTipCardProps {
  tip: string;
  chefName: string;
}

export const ChefTipCard: React.FC<ChefTipCardProps> = ({ tip, chefName }) => {
  return (
    <Card className="mb-4 bg-wasfah-light-gray border-wasfah-bright-teal/20">
      <CardContent className="p-4">
        <div className="flex">
          <div className="mr-3 mt-1">
            <ChefHat className="h-6 w-6 text-wasfah-bright-teal" />
          </div>
          <div>
            <p className="text-sm leading-relaxed text-gray-800">{tip}</p>
            <p className="text-xs text-wasfah-bright-teal mt-2">- {chefName}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

