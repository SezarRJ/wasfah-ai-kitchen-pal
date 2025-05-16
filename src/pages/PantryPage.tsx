
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { mockPantryItems } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { PantryItemCard } from '@/components/pantry/PantryItemCard';
import { Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function PantryPage() {
  const [activeTab, setActiveTab] = useState('all');

  // Group pantry items by category
  const groupedItems = mockPantryItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof mockPantryItems>);

  // Get items expiring in the next 7 days
  const today = new Date();
  const expiringItems = mockPantryItems.filter(item => {
    if (!item.expiryDate) return false;
    const expiryDate = new Date(item.expiryDate);
    const diffDays = Math.round((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  });

  return (
    <PageContainer
      header={{
        title: 'My Pantry',
        showSearch: true,
        actions: (
          <Button variant="ghost" size="icon" className="text-wasfah-deep-teal">
            <Plus size={20} />
          </Button>
        ),
      }}
    >
      <div className="container px-4 py-4">
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="expiring">
              Expiring
              {expiringItems.length > 0 && (
                <span className="ml-1 bg-wasfah-coral-red text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {expiringItems.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="shopping">Shopping</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-4">
              {mockPantryItems.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500 mb-4">Your pantry is empty</p>
                  <Button className="bg-wasfah-bright-teal hover:bg-wasfah-teal">
                    <Plus size={16} className="mr-2" />
                    Add Items
                  </Button>
                </div>
              ) : (
                mockPantryItems.map(item => (
                  <PantryItemCard key={item.id} item={item} />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="expiring">
            <div className="space-y-4">
              {expiringItems.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">No items expiring soon</p>
                </div>
              ) : (
                expiringItems.map(item => (
                  <PantryItemCard key={item.id} item={item} />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="categories">
            <div className="space-y-6">
              {Object.entries(groupedItems).map(([category, items]) => (
                <div key={category}>
                  <h3 className="font-bold mb-2 text-wasfah-deep-teal">{category}</h3>
                  <div className="space-y-3">
                    {items.map(item => (
                      <PantryItemCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shopping">
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">Your shopping list is empty</p>
              <Button className="bg-wasfah-bright-teal hover:bg-wasfah-teal">
                <Plus size={16} className="mr-2" />
                Add Items
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
