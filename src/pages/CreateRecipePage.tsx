
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { categories, cuisines, difficulties } from '@/data/mockData';

interface Ingredient {
  id: string;
  quantity: string;
  unit: string;
  name: string;
}

interface Step {
  id: string;
  instruction: string;
}

export default function CreateRecipePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [servings, setServings] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', quantity: '', unit: '', name: '' }
  ]);
  const [steps, setSteps] = useState<Step[]>([
    { id: '1', instruction: '' }
  ]);
  const [images, setImages] = useState<string[]>([]);
  
  // Handle tag input
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput) {
      e.preventDefault();
      if (!tags.includes(tagInput)) {
        setTags([...tags, tagInput]);
      }
      setTagInput('');
    }
  };
  
  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  // Add ingredient
  const addIngredient = () => {
    setIngredients([
      ...ingredients, 
      { id: `ing-${Date.now()}`, quantity: '', unit: '', name: '' }
    ]);
  };
  
  // Update ingredient
  const updateIngredient = (id: string, field: keyof Ingredient, value: string) => {
    setIngredients(ingredients.map(ing => 
      ing.id === id ? { ...ing, [field]: value } : ing
    ));
  };
  
  // Remove ingredient
  const removeIngredient = (id: string) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter(ing => ing.id !== id));
    }
  };
  
  // Add step
  const addStep = () => {
    setSteps([
      ...steps, 
      { id: `step-${Date.now()}`, instruction: '' }
    ]);
  };
  
  // Update step
  const updateStep = (id: string, instruction: string) => {
    setSteps(steps.map(step => 
      step.id === id ? { ...step, instruction } : step
    ));
  };
  
  // Remove step
  const removeStep = (id: string) => {
    if (steps.length > 1) {
      setSteps(steps.filter(step => step.id !== id));
    }
  };
  
  // Add image
  const addImage = () => {
    // In a real app, this would open a file picker
    // For now, just add a placeholder image
    setImages([...images, `https://picsum.photos/seed/${Date.now()}/300/200`]);
  };
  
  // Remove image
  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };
  
  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check required fields
    if (!title || !description || !prepTime || !cookTime || !servings || !cuisine || !difficulty) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Recipe submitted",
      description: "Your recipe has been submitted for review.",
    });
    
    // In a real app, we would save the recipe to the database
    // For now, just navigate back to home
    navigate('/profile');
  };
  
  return (
    <PageContainer
      header={{
        title: 'Create Recipe',
        showBackButton: true,
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="title">Recipe Title</Label>
          <Input 
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter recipe title"
            required
          />
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Briefly describe your recipe"
            className="min-h-[100px]"
            required
          />
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-2">
            <Label htmlFor="prepTime">Prep Time (min)</Label>
            <Input 
              id="prepTime"
              type="number"
              min="0"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
              placeholder="20"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cookTime">Cook Time (min)</Label>
            <Input 
              id="cookTime"
              type="number"
              min="0"
              value={cookTime}
              onChange={(e) => setCookTime(e.target.value)}
              placeholder="30"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="servings">Servings</Label>
            <Input 
              id="servings"
              type="number"
              min="1"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
              placeholder="4"
              required
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="cuisine">Cuisine</Label>
          <Select value={cuisine} onValueChange={setCuisine}>
            <SelectTrigger>
              <SelectValue placeholder="Select cuisine" />
            </SelectTrigger>
            <SelectContent>
              {cuisines.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="tags">Tags</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <Badge key={index} className="bg-wasfah-bright-teal text-white flex items-center gap-1">
                {tag}
                <X size={12} className="cursor-pointer" onClick={() => removeTag(tag)} />
              </Badge>
            ))}
          </div>
          <Input 
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="Add tag and press Enter"
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Ingredients</Label>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              className="text-wasfah-bright-teal"
              onClick={addIngredient}
            >
              <Plus size={16} className="mr-1" />
              Add
            </Button>
          </div>
          
          <div className="space-y-3">
            {ingredients.map((ing, index) => (
              <div key={ing.id} className="flex items-center gap-2">
                <Input
                  value={ing.quantity}
                  onChange={(e) => updateIngredient(ing.id, 'quantity', e.target.value)}
                  placeholder="Qty"
                  className="w-20"
                />
                <Input
                  value={ing.unit}
                  onChange={(e) => updateIngredient(ing.id, 'unit', e.target.value)}
                  placeholder="Unit"
                  className="w-24"
                />
                <Input
                  value={ing.name}
                  onChange={(e) => updateIngredient(ing.id, 'name', e.target.value)}
                  placeholder="Ingredient name"
                  className="flex-grow"
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon"
                  className="text-gray-400"
                  onClick={() => removeIngredient(ing.id)}
                  disabled={ingredients.length === 1}
                >
                  <X size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Instructions</Label>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              className="text-wasfah-bright-teal"
              onClick={addStep}
            >
              <Plus size={16} className="mr-1" />
              Add
            </Button>
          </div>
          
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex gap-2">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-wasfah-bright-teal text-white flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="flex-grow">
                  <Textarea
                    value={step.instruction}
                    onChange={(e) => updateStep(step.id, e.target.value)}
                    placeholder={`Step ${index + 1} instruction`}
                    className="min-h-[80px]"
                  />
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon"
                  className="text-gray-400"
                  onClick={() => removeStep(step.id)}
                  disabled={steps.length === 1}
                >
                  <X size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <Label>Photos</Label>
          <div className="flex flex-wrap gap-3">
            {images.map((image, index) => (
              <div key={index} className="relative w-24 h-24">
                <img 
                  src={image} 
                  alt={`Recipe photo ${index + 1}`} 
                  className="w-full h-full object-cover rounded-lg"
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon"
                  className="absolute top-0 right-0 bg-black/50 text-white rounded-full w-6 h-6 p-1"
                  onClick={() => removeImage(index)}
                >
                  <X size={12} />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-24 h-24 flex flex-col items-center justify-center border-dashed"
              onClick={addImage}
            >
              <Camera size={24} className="mb-1" />
              <span className="text-xs">Add Photo</span>
            </Button>
          </div>
        </div>
        
        <Button type="submit" className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal">
          Submit Recipe for Review
        </Button>
      </form>
    </PageContainer>
  );
}
