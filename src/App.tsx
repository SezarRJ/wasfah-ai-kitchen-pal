
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewHomePage from "./pages/NewHomePage";
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
import GlobalCuisinePage from "./pages/GlobalCuisinePage";
import SharedRecipesPage from "./pages/SharedRecipesPage";
import ChefAvatarPage from "./pages/ChefAvatarPage";

// Admin Panel Routes
import AdminPage from "./pages/AdminPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminRecipes from "./pages/admin/AdminRecipes";
import AdminSystemMonitoring from "./pages/admin/AdminSystemMonitoring";
import AdminAuthGuard from "./components/admin/AdminAuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NewHomePage />} />
          <Route path="/home" element={<NewHomePage />} />
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
          <Route path="/global-cuisine" element={<GlobalCuisinePage />} />
          <Route path="/shared-recipes" element={<SharedRecipesPage />} />
          <Route path="/chef-avatar" element={<ChefAvatarPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route 
            path="/admin" 
            element={
              <AdminAuthGuard>
                <AdminPage />
              </AdminAuthGuard>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="recipes" element={<AdminRecipes />} />
            <Route path="system" element={<AdminSystemMonitoring />} />
            {/* Other admin routes will be added here as needed */}
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
