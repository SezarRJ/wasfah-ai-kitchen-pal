
// Define ChefPersonality type
export type ChefPersonality = 'Traditional' | 'Adventurous' | 'Health-conscious' | 'Comfort Food' | 
  'Gourmet' | 'Speedy Chef' | 'Precision' | 'Creative';

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
  ingredients: {
    id: string;
    name: string;
    quantity: string;
    unit: string;
    inPantry: boolean;
  }[];
  instructions: string[];
  categories: string[];
  tags: string[];
  isFavorite: boolean;
  nutritionalInfo?: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  dietaryPreferences?: string[];
  allergies?: string[];
  favoriteRecipes?: string[];
}

export interface MealPlan {
  id: string;
  date: Date;
  meals: {
    id: string;
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    recipeId: string;
    completed: boolean;
  }[];
}

export interface PantryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate?: Date;
  image?: string;
}

export interface NutritionGoal {
  id: string;
  type: 'calories' | 'protein' | 'carbs' | 'fat' | 'fiber' | 'sugar';
  target: number;
  current: number;
}

export interface HealthRecord {
  id: string;
  date: Date;
  weight?: number;
  height?: number;
  bmi?: number;
  notes?: string;
}

export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  checked: boolean;
  category?: string;
}

export interface RecipeSocialData {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  usedCount: number;
  isLiked: boolean;
}
