
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MealCard } from '@/components/meal-plan/MealCard';
import { MealPlan } from '@/types';

interface TodayMealPlanProps {
  mealPlan: MealPlan | undefined;
}

export const TodayMealPlan: React.FC<TodayMealPlanProps> = ({ mealPlan }) => {
  if (!mealPlan) return null;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-wasfah-deep-teal">Your meal plan today</h2>
        <Link to="/meal-plan">
          <Button variant="link" className="text-wasfah-bright-teal p-0">
            View Week
          </Button>
        </Link>
      </div>
      
      <div>
        {mealPlan.meals.map(meal => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
};
