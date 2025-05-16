
import React from 'react';
import { RecipeCard } from './RecipeCard';
import { Recipe } from '@/types';

interface RecipeGridProps {
  recipes: Recipe[];
  columns?: 1 | 2;
  cardSize?: 'small' | 'medium' | 'large';
}

export const RecipeGrid: React.FC<RecipeGridProps> = ({
  recipes,
  columns = 2,
  cardSize = 'medium',
}) => {
  return (
    <div className={`grid grid-cols-${columns} gap-4`}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} size={cardSize} />
      ))}
    </div>
  );
};
