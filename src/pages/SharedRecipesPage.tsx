
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChefHat, Eye, Calendar, Heart, Share2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for shared recipes
const sharedRecipes = [
  {
    id: '1',
    title: 'Homemade Hummus',
    image: '/placeholder.svg',
    date: '2025-05-01',
    status: 'approved',
    metrics: {
      views: 245,
      used: 18,
      likes: 42,
      shares: 7
    }
  },
  {
    id: '2',
    title: 'Lebanese Tabbouleh',
    image: '/placeholder.svg',
    date: '2025-05-10',
    status: 'approved',
    metrics: {
      views: 187,
      used: 12,
      likes: 36,
      shares: 5
    }
  },
  {
    id: '3',
    title: 'Spicy Shakshuka',
    image: '/placeholder.svg',
    date: '2025-05-15',
    status: 'pending',
    metrics: {
      views: 0,
      used: 0,
      likes: 0,
      shares: 0
    }
  }
];

const SharedRecipesPage = () => {
  return (
    <PageContainer
      header={{
        title: 'My Shared Recipes',
        showBackButton: true,
      }}
    >
      <div className="space-y-6 pb-20">
        <div className="flex items-center space-x-2">
          <ChefHat size={24} className="text-wasfah-bright-teal" />
          <h2 className="text-xl font-bold text-wasfah-deep-teal">My Contributions</h2>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="all">All Recipes</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="space-y-4">
              {sharedRecipes.map((recipe) => (
                <Card key={recipe.id}>
                  <CardContent className="p-0">
                    <div className="flex">
                      <div
                        className="w-24 h-24 bg-cover bg-center"
                        style={{ backgroundImage: `url(${recipe.image})` }}
                      />
                      <div className="p-3 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-wasfah-deep-teal">{recipe.title}</h3>
                            <p className="text-xs text-gray-500">Shared on {new Date(recipe.date).toLocaleDateString()}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${
                            recipe.status === 'approved' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {recipe.status === 'approved' ? 'Approved' : 'Pending'}
                          </span>
                        </div>
                        
                        {recipe.status === 'approved' && (
                          <div className="grid grid-cols-4 mt-2 gap-2 text-center">
                            <div className="flex flex-col items-center">
                              <Eye size={16} className="text-wasfah-bright-teal" />
                              <span className="text-xs font-medium">{recipe.metrics.views}</span>
                              <span className="text-xs text-gray-500">Views</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <Calendar size={16} className="text-wasfah-bright-teal" />
                              <span className="text-xs font-medium">{recipe.metrics.used}</span>
                              <span className="text-xs text-gray-500">Used</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <Heart size={16} className="text-wasfah-bright-teal" />
                              <span className="text-xs font-medium">{recipe.metrics.likes}</span>
                              <span className="text-xs text-gray-500">Likes</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <Share2 size={16} className="text-wasfah-bright-teal" />
                              <span className="text-xs font-medium">{recipe.metrics.shares}</span>
                              <span className="text-xs text-gray-500">Shares</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="approved">
            <div className="space-y-4">
              {sharedRecipes
                .filter(recipe => recipe.status === 'approved')
                .map((recipe) => (
                  <Card key={recipe.id}>
                    <CardContent className="p-0">
                      <div className="flex">
                        <div
                          className="w-24 h-24 bg-cover bg-center"
                          style={{ backgroundImage: `url(${recipe.image})` }}
                        />
                        <div className="p-3 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-wasfah-deep-teal">{recipe.title}</h3>
                              <p className="text-xs text-gray-500">Shared on {new Date(recipe.date).toLocaleDateString()}</p>
                            </div>
                            <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800">
                              Approved
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-4 mt-2 gap-2 text-center">
                            <div className="flex flex-col items-center">
                              <Eye size={16} className="text-wasfah-bright-teal" />
                              <span className="text-xs font-medium">{recipe.metrics.views}</span>
                              <span className="text-xs text-gray-500">Views</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <Calendar size={16} className="text-wasfah-bright-teal" />
                              <span className="text-xs font-medium">{recipe.metrics.used}</span>
                              <span className="text-xs text-gray-500">Used</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <Heart size={16} className="text-wasfah-bright-teal" />
                              <span className="text-xs font-medium">{recipe.metrics.likes}</span>
                              <span className="text-xs text-gray-500">Likes</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <Share2 size={16} className="text-wasfah-bright-teal" />
                              <span className="text-xs font-medium">{recipe.metrics.shares}</span>
                              <span className="text-xs text-gray-500">Shares</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="pending">
            <div className="space-y-4">
              {sharedRecipes
                .filter(recipe => recipe.status === 'pending')
                .map((recipe) => (
                  <Card key={recipe.id}>
                    <CardContent className="p-0">
                      <div className="flex">
                        <div
                          className="w-24 h-24 bg-cover bg-center"
                          style={{ backgroundImage: `url(${recipe.image})` }}
                        />
                        <div className="p-3 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-wasfah-deep-teal">{recipe.title}</h3>
                              <p className="text-xs text-gray-500">Shared on {new Date(recipe.date).toLocaleDateString()}</p>
                            </div>
                            <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          </div>
                          
                          <p className="text-xs text-gray-500 mt-2">
                            Your recipe is under review. You'll be notified once it's approved.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <Button 
          className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
          onClick={() => window.location.href = '/create-recipe'}
        >
          <ChefHat size={16} className="mr-2" /> Create New Recipe
        </Button>
      </div>
    </PageContainer>
  );
};

export default SharedRecipesPage;
