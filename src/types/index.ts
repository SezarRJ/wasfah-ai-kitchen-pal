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
  tips?: string[]; // Added optional tips property
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
  healthMetrics?: HealthMetrics;
  loyaltyPoints?: number;
  loyaltyLevel?: string;
  achievements?: Achievement[];
  // Add the missing properties
  avatar?: string;
  recipesSaved?: number;
  recipesCreated?: number;
  followersCount?: number;
}

// Health Tracking Types
export interface HealthMetrics {
  weight?: number; // in kg
  height?: number; // in cm
  bmi?: number;
  dailyActivityLevel?: 'Sedentary' | 'Light' | 'Moderate' | 'Active' | 'Very Active';
  waterIntake?: number; // in ml
  sleepHours?: number;
  caloriesBurned?: number;
}

export interface DailyNutritionLog {
  date: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  waterIntake: number;
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

// Shopping List Types
export interface ShoppingList {
  id: string;
  name: string;
  items: ShoppingItem[];
  createdAt: string;
  lastUpdated: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  checked: boolean;
  addedFrom?: string; // recipe id or 'manual'
}

// Ingredient Swap Types
export interface IngredientSwap {
  originalIngredient: string;
  alternatives: SwapAlternative[];
}

export interface SwapAlternative {
  name: string;
  nutritionalImpact: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  suitableFor: string[]; // dietary preferences it works for
  flavorProfile: string[]; // sweet, salty, etc.
}

// Loyalty Program Types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  pointsAwarded: number;
  dateEarned?: string;
  progress?: number; // percentage of completion
  total?: number; // total required to complete
}

export interface LoyaltyReward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  image: string;
  isAvailable: boolean;
}

// Auth Types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Subscription Types
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
  isPopular?: boolean;
}
