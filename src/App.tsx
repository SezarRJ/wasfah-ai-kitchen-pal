
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecipesPage from "./pages/RecipesPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import PantryPage from "./pages/PantryPage";
import MealPlanPage from "./pages/MealPlanPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import NotFound from "./pages/NotFound";
import SplashScreen from "./pages/SplashScreen";
import AuthPage from "./pages/AuthPage";
import NutritionGoalsPage from "./pages/NutritionGoalsPage";
import HealthTrackingPage from "./pages/HealthTrackingPage";
import IngredientSwapPage from "./pages/IngredientSwapPage";
import ShoppingListPage from "./pages/ShoppingListPage";
import LoyaltyProgramPage from "./pages/LoyaltyProgramPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import SettingsPage from "./pages/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route path="/pantry" element={<PantryPage />} />
          <Route path="/meal-plan" element={<MealPlanPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/create-recipe" element={<CreateRecipePage />} />
          <Route path="/nutrition-goals" element={<NutritionGoalsPage />} />
          <Route path="/health-tracking" element={<HealthTrackingPage />} />
          <Route path="/ingredient-swap" element={<IngredientSwapPage />} />
          <Route path="/shopping-list" element={<ShoppingListPage />} />
          <Route path="/loyalty" element={<LoyaltyProgramPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
