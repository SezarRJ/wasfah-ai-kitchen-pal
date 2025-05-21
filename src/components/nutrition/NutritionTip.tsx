
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info, Check } from 'lucide-react';

interface NutritionTipProps {
  tip: string;
  source?: string;
  onApply?: (tip: string) => void;
}

export const NutritionTip: React.FC<NutritionTipProps> = ({
  tip,
  source = "Nutrition Expert",
  onApply
}) => {
  return (
    <Card className="border-wasfah-bright-teal/20 bg-gradient-to-r from-wasfah-light-gray to-wasfah-light-mint/10">
      <CardContent className="pt-6 pb-4 px-4">
        <div className="flex items-start">
          <Info className="h-5 w-5 mt-0.5 text-wasfah-bright-teal flex-shrink-0" />
          <div className="ml-3 flex-1">
            <p className="text-sm text-gray-700">{tip}</p>
            <div className="flex justify-between items-center mt-3">
              <p className="text-xs text-gray-500">— {source}</p>
              {onApply && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-wasfah-bright-teal hover:bg-wasfah-bright-teal/10"
                  onClick={() => onApply(tip)}
                >
                  <Check className="h-3.5 w-3.5 mr-1" />
                  Apply
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
