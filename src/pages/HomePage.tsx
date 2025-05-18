
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { RecommendedRecipes } from '@/components/home/RecommendedRecipes';
import { TodayMealPlan } from '@/components/home/TodayMealPlan';
import { ExpiringIngredients } from '@/components/home/ExpiringIngredients';
import { QuickActionsSection } from '@/components/home/QuickActionsSection';
import { LoyaltyCard } from '@/components/home/LoyaltyCard';
import { SubscriptionBanner } from '@/components/home/SubscriptionBanner';
import { AdminLink } from '@/components/admin/AdminLink';

const HomePage = () => {
  const header = {
    showLogo: true,
    showSearch: true,
    actions: null,
  };

  return (
    <PageContainer header={header}>
      <div className="space-y-6">
        <RecommendedRecipes />
        <TodayMealPlan />
        <ExpiringIngredients />
        <QuickActionsSection />
        <LoyaltyCard />
        <SubscriptionBanner />
      </div>
      <AdminLink />
    </PageContainer>
  );
};

export default HomePage;
