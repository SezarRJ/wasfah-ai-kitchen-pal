
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ChefAvatarProps {
  level: number;
  experience: number;
  nextLevelExperience: number;
  personality: string;
  name: string;
  avatarUrl: string;
}

export const ChefAvatar: React.FC<ChefAvatarProps> = ({
  level,
  experience,
  nextLevelExperience,
  personality,
  name,
  avatarUrl,
}) => {
  const experiencePercentage = (experience / nextLevelExperience) * 100;

  return (
    <Card className="mb-4 overflow-hidden border-wasfah-bright-teal hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex items-center p-4">
          <div className="relative mr-4">
            <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-wasfah-bright-teal">
              <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-wasfah-bright-teal text-white text-xs font-bold h-6 w-6 rounded-full flex items-center justify-center">
              {level}
            </div>
          </div>
          
          <div className="flex-1">
            <h4 className="font-bold text-wasfah-deep-teal">{name}</h4>
            <p className="text-sm text-gray-600">{personality} Chef</p>
            <div className="mt-1">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">Experience</span>
                <span className="text-wasfah-bright-teal font-medium">{experience}/{nextLevelExperience}</span>
              </div>
              <Progress value={experiencePercentage} className="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

