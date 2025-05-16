
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingBag, Plus, Trash2, FileText, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample shopping list data
const initialItems = [
  { id: '1', name: 'Chicken breast', quantity: 500, unit: 'g', category: 'Meat', checked: false },
  { id: '2', name: 'Olive oil', quantity: 1, unit: 'bottle', category: 'Oils', checked: false },
  { id: '3', name: 'Garlic', quantity: 5, unit: 'cloves', category: 'Vegetables', checked: false },
  { id: '4', name: 'Onions', quantity: 2, unit: '', category: 'Vegetables', checked: true },
  { id: '5', name: 'Rice', quantity: 1, unit: 'kg', category: 'Grains', checked: false },
  { id: '6', name: 'Tomatoes', quantity: 4, unit: '', category: 'Vegetables', checked: false },
  { id: '7', name: 'Greek yogurt', quantity: 500, unit: 'g', category: 'Dairy', checked: true },
  { id: '8', name: 'Lemons', quantity: 3, unit: '', category: 'Fruits', checked: false },
];

export default function ShoppingListPage() {
  const { toast } = useToast();
  const [items, setItems] = useState(initialItems);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  const categories = [...new Set(items.map(item => item.category))].sort();
  
  const handleCheck = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };
  
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItemName.trim()) {
      toast({
        title: "Error",
        description: "Please enter an item name",
        variant: "destructive",
      });
      return;
    }
    
    const newItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      quantity: Number(newItemQuantity) || 1,
      unit: newItemUnit.trim(),
      category: 'Other',
      checked: false,
    };
    
    setItems([newItem, ...items]);
    setNewItemName('');
    setNewItemQuantity('');
    setNewItemUnit('');
    setShowAddForm(false);
    
    toast({
      title: "Item added",
      description: `${newItem.name} added to your shopping list.`,
    });
  };
  
  const handleRemoveChecked = () => {
    const checkedItems = items.filter(item => item.checked);
    if (checkedItems.length === 0) {
      toast({
        title: "No items selected",
        description: "Please check items to remove.",
      });
      return;
    }
    
    setItems(items.filter(item => !item.checked));
    toast({
      title: "Items removed",
      description: `${checkedItems.length} item(s) removed from your list.`,
    });
  };
  
  return (
    <PageContainer header={{ title: 'Shopping List', showBackButton: true }}>
      <div className="space-y-4 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ShoppingBag className="h-5 w-5 text-wasfah-bright-teal mr-2" />
            <h2 className="text-lg font-bold text-wasfah-deep-teal">My Shopping List</h2>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center"
            >
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center"
            >
              <FileText className="h-4 w-4 mr-1" />
              Lists
            </Button>
          </div>
        </div>
        
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">{items.length} items ({items.filter(i => i.checked).length} checked)</p>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-500 border-red-200 hover:bg-red-50"
                onClick={handleRemoveChecked}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear Checked
              </Button>
              <Button 
                size="sm" 
                className="bg-wasfah-bright-teal hover:bg-wasfah-teal"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Item
              </Button>
            </div>
          </div>
          
          {showAddForm && (
            <form onSubmit={handleAddItem} className="mb-4 p-3 bg-wasfah-light-gray rounded-md">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6">
                  <Input
                    placeholder="Item name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="h-9"
                  />
                </div>
                <div className="col-span-3">
                  <Input
                    placeholder="Quantity"
                    type="number"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(e.target.value)}
                    className="h-9"
                  />
                </div>
                <div className="col-span-3">
                  <Input
                    placeholder="Unit"
                    value={newItemUnit}
                    onChange={(e) => setNewItemUnit(e.target.value)}
                    className="h-9"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-2 space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-wasfah-bright-teal hover:bg-wasfah-teal"
                >
                  Add
                </Button>
              </div>
            </form>
          )}
          
          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="all">All Items</TabsTrigger>
              <TabsTrigger value="byCategory">By Category</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-1">
              {items.map(item => (
                <div 
                  key={item.id} 
                  className={`flex items-center justify-between p-3 rounded-md ${
                    item.checked 
                      ? 'bg-gray-50 text-gray-500' 
                      : 'bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      checked={item.checked} 
                      onCheckedChange={() => handleCheck(item.id)}
                      className="h-5 w-5"
                    />
                    <div className={item.checked ? 'line-through' : ''}>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500">
                        {item.quantity} {item.unit} • {item.category}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="byCategory" className="space-y-4">
              {categories.map(category => {
                const categoryItems = items.filter(item => item.category === category);
                return (
                  <div key={category}>
                    <h3 className="font-semibold text-wasfah-deep-teal mb-2">{category}</h3>
                    <div className="space-y-1">
                      {categoryItems.map(item => (
                        <div 
                          key={item.id} 
                          className={`flex items-center justify-between p-3 rounded-md ${
                            item.checked 
                              ? 'bg-gray-50 text-gray-500' 
                              : 'bg-white'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Checkbox 
                              checked={item.checked} 
                              onCheckedChange={() => handleCheck(item.id)}
                              className="h-5 w-5"
                            />
                            <div className={item.checked ? 'line-through' : ''}>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-xs text-gray-500">
                                {item.quantity} {item.unit}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </PageContainer>
  );
}
