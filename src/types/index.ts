
// Recipe Types
export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  calories: number;
  rating: number;
  ratingCount: number;
  cuisineType: string;
  ingredients: Ingredient[];
  instructions: string[];
  tags: string[];
  isFavorite: boolean;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  inPantry: boolean;
}

// Pantry Types
export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expiryDate: string;
  location: string;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  isPremium: boolean;
  dietaryPreferences: string[];
  cuisinePreferences: string[];
  allergens: string[];
  chefAvatar: string;
  nutritionalGoals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

// Meal Plan Types
export interface MealPlan {
  id: string;
  date: string;
  meals: Meal[];
  nutritionSummary: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface Meal {
  id: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  recipe: Recipe;
}
