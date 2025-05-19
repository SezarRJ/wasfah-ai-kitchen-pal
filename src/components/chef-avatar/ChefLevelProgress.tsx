
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChefHat, Trophy, Award } from 'lucide-react';

interface ChefLevelProgressProps {
  level: number;
  experience: number;
  nextLevelExperience: number;
  recentActivity?: {
    id: string;
    action: string;
    points: number;
    date: string;
  }[];
}

export const ChefLevelProgress: React.FC<ChefLevelProgressProps> = ({
  level,
  experience,
  nextLevelExperience,
  recentActivity = []
}) => {
  const experiencePercentage = (experience / nextLevelExperience) * 100;
  const experienceToNextLevel = nextLevelExperience - experience;

  return (
    <Card className="mb-6 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-wasfah-deep-teal flex items-center">
          <Trophy size={18} className="mr-2 text-wasfah-bright-teal" />
          Chef Level Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-wasfah-bright-teal to-wasfah-deep-teal text-white mb-4">
            <div>
              <div className="text-3xl font-bold">{level}</div>
              <div className="text-xs">LEVEL</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Experience</span>
              <span className="text-wasfah-bright-teal font-medium">{experience}/{nextLevelExperience}</span>
            </div>
            <Progress value={experiencePercentage} className="h-3" />
            <p className="text-xs text-gray-500 mt-1">
              {experienceToNextLevel} XP needed for Level {level + 1}
            </p>
          </div>
        </div>
        
        {recentActivity.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium text-sm flex items-center mb-2">
              <Award size={16} className="mr-1 text-wasfah-bright-teal" />
              Recent Activity
            </h4>
            <div className="space-y-2">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    <ChefHat size={14} className="mr-2 text-wasfah-bright-teal" />
                    <span>{activity.action}</span>
                  </div>
                  <div className="font-medium text-wasfah-deep-teal">+{activity.points} XP</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
