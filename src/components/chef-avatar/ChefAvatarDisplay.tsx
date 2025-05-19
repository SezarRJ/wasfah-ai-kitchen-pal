
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChefHat, Award } from 'lucide-react';
import { ChefPersonality } from '@/types';

interface ChefAvatarDisplayProps {
  name: string;
  level: number;
  experience: number;
  nextLevelExperience: number;
  personality: ChefPersonality;
  avatarUrl: string;
  achievements?: {
    id: string;
    title: string;
    icon: React.ReactNode;
  }[];
}

export const ChefAvatarDisplay: React.FC<ChefAvatarDisplayProps> = ({
  name,
  level,
  experience,
  nextLevelExperience,
  personality,
  avatarUrl,
  achievements = [],
}) => {
  const experiencePercentage = (experience / nextLevelExperience) * 100;

  return (
    <Card className="overflow-hidden border-wasfah-bright-teal/20 hover:shadow-md transition-shadow animate-fade-in">
      <CardContent className="p-0">
        <div className="bg-gradient-to-br from-wasfah-light-gray to-white p-4">
          <div className="flex items-center">
            <div className="relative mr-4">
              <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-wasfah-bright-teal">
                <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-wasfah-bright-teal text-white text-sm font-bold h-7 w-7 rounded-full flex items-center justify-center">
                {level}
              </div>
            </div>
            
            <div className="flex-1">
              <h4 className="font-bold text-wasfah-deep-teal text-lg">{name}</h4>
              <div className="flex items-center">
                <ChefHat size={16} className="text-wasfah-bright-teal mr-1" />
                <p className="text-sm text-gray-600">{personality} Chef</p>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">Experience</span>
                  <span className="text-wasfah-bright-teal font-medium">{experience}/{nextLevelExperience}</span>
                </div>
                <Progress value={experiencePercentage} className="h-2" />
              </div>
            </div>
          </div>
          
          {achievements.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center text-sm font-medium text-wasfah-deep-teal mb-2">
                <Award size={16} className="mr-1" />
                Recent Achievements
              </div>
              <div className="flex gap-2 overflow-x-auto py-1 scrollbar-hide">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className="flex items-center bg-wasfah-light-gray p-2 rounded-md min-w-max"
                  >
                    <div className="mr-2 text-wasfah-bright-teal">{achievement.icon}</div>
                    <span className="text-xs">{achievement.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
