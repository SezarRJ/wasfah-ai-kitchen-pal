
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChefTipCardProps {
  tip: string;
  chefName: string;
  personality?: string;
  onApply?: (tip: string) => void;
}

export const ChefTipCard: React.FC<ChefTipCardProps> = ({ 
  tip, 
  chefName, 
  personality,
  onApply 
}) => {
  return (
    <Card className="mb-4 bg-wasfah-light-gray border-wasfah-bright-teal/20 hover:shadow-md transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex">
          <div className="mr-3 mt-1">
            <ChefHat className="h-6 w-6 text-wasfah-bright-teal" />
          </div>
          <div className="flex-1">
            <p className="text-sm leading-relaxed text-gray-800">{tip}</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-wasfah-bright-teal">
                - {chefName}
                {personality && <span className="ml-1 text-gray-600">({personality})</span>}
              </p>
              {onApply && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onApply(tip)}
                  className="text-xs border-wasfah-bright-teal text-wasfah-bright-teal hover:bg-wasfah-bright-teal hover:text-white"
                >
                  Apply Tip
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
