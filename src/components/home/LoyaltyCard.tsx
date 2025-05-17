
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Award, ChevronRight } from 'lucide-react';

export const LoyaltyCard: React.FC = () => {
  return (
    <Link to="/loyalty">
      <Card className="border-wasfah-bright-teal hover:shadow-md transition-all">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Award className="h-5 w-5 text-wasfah-bright-teal mr-3" />
              <div>
                <div className="text-wasfah-deep-teal font-medium">Gold Level Member</div>
                <div className="text-xs text-gray-600">850 points</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-2">
                <div className="text-xs text-right text-gray-600">Next level</div>
                <Progress value={56.6} className="w-20 h-1.5" />
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
