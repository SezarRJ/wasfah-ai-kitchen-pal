
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Utensils } from 'lucide-react';
import { PantryItem } from '@/types';

interface ExpiringIngredientsProps {
  expiringItems: PantryItem[];
}

export const ExpiringIngredients: React.FC<ExpiringIngredientsProps> = ({ expiringItems }) => {
  if (expiringItems.length === 0) return null;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-wasfah-deep-teal">Cook with what you have</h2>
        <Link to="/pantry">
          <Button variant="link" className="text-wasfah-bright-teal p-0">
            View All
          </Button>
        </Link>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <p className="text-sm text-gray-600 mb-3">
          You have {expiringItems.length} items expiring soon. Let's use them!
        </p>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {expiringItems.map(item => (
            <div
              key={item.id}
              className="px-3 py-2 bg-wasfah-light-gray rounded-md text-wasfah-deep-teal text-sm whitespace-nowrap flex-shrink-0 border border-gray-200"
            >
              {item.name}
            </div>
          ))}
          <div className="px-3 py-2 bg-wasfah-light-gray rounded-md text-wasfah-bright-teal text-sm font-medium whitespace-nowrap flex-shrink-0 border border-wasfah-bright-teal flex items-center">
            + Add
          </div>
        </div>
        <Button className="w-full mt-3 bg-wasfah-bright-teal hover:bg-wasfah-teal text-white">
          <Utensils size={16} className="mr-2" />
          Find Recipes
        </Button>
      </div>
    </div>
  );
};
