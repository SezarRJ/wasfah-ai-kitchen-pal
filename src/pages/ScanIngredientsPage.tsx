
import React, { useState, useRef } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Image, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface IngredientInfo {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sugar: number;
  fiber: number;
}

export default function ScanIngredientsPage() {
  const [selectedTab, setSelectedTab] = useState<string>("camera");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Sample data for demo purposes
  const [ingredients, setIngredients] = useState<IngredientInfo[]>([
    { name: "Chicken breast", quantity: "200g", calories: 330, protein: 62, carbs: 0, fats: 7 },
    { name: "Olive oil", quantity: "15ml", calories: 120, protein: 0, carbs: 0, fats: 14 },
    { name: "Bell peppers", quantity: "100g", calories: 31, protein: 1, carbs: 6, fats: 0.3 },
    { name: "Onions", quantity: "50g", calories: 22, protein: 0.6, carbs: 5, fats: 0.1 }
  ]);

  const [nutrition, setNutrition] = useState<NutritionInfo>({
    calories: 503,
    protein: 63.6,
    carbs: 11,
    fat: 21.4,
    sugar: 3.2,
    fiber: 2.5
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraCapture = async () => {
    try {
      // In a real implementation, we would access the device camera here
      // For now, we'll just simulate it with a timeout
      toast({
        title: "Camera accessed",
        description: "Please take a photo of your dish"
      });
      
      // Simulate camera usage
      setTimeout(() => {
        setImagePreview("/placeholder.svg");
      }, 500);
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const handleProcessImage = async () => {
    if (!imagePreview) {
      toast({
        title: "No image selected",
        description: "Please take a photo or select an image first",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing with a delayed response
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
      toast({
        title: "Analysis Complete",
        description: "Your dish has been analyzed successfully!"
      });
    }, 2000);
  };

  const handleSaveToShoppingList = () => {
    toast({
      title: "Added to Shopping List",
      description: "All ingredients have been added to your shopping list"
    });
  };

  const handleSaveToHealth = () => {
    toast({
      title: "Added to Health Tracking",
      description: "Nutritional information has been added to your health records"
    });
  };

  return (
    <PageContainer header={{ title: "Scan Dish", showBackButton: true }}>
      <div className="space-y-6 pb-24">
        <Card className="bg-gradient-to-br from-wasfah-deep-teal to-wasfah-bright-teal text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">AI Dish Scanner</h2>
                <p className="text-sm opacity-90">Scan any dish to identify ingredients and nutrition</p>
              </div>
              <Sparkles size={48} className="opacity-70" />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="camera" onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="camera" className="flex items-center justify-center">
              <Camera className="mr-2 h-4 w-4" />
              Camera
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center justify-center">
              <Image className="mr-2 h-4 w-4" />
              Gallery
            </TabsTrigger>
          </TabsList>
          <TabsContent value="camera" className="mt-4">
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                {!imagePreview ? (
                  <div 
                    className="w-full h-64 bg-gray-100 rounded-lg flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300"
                    onClick={handleCameraCapture}
                  >
                    <Camera size={48} className="text-gray-400 mb-2" />
                    <p className="text-gray-500">Tap to access camera</p>
                  </div>
                ) : (
                  <div className="relative w-full">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Button 
                      variant="outline" 
                      className="absolute top-2 right-2 bg-white/80"
                      onClick={() => setImagePreview(null)}
                    >
                      Change
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="gallery" className="mt-4">
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="hidden" 
                />
                {!imagePreview ? (
                  <div 
                    className="w-full h-64 bg-gray-100 rounded-lg flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300"
                    onClick={handleGalleryClick}
                  >
                    <Image size={48} className="text-gray-400 mb-2" />
                    <p className="text-gray-500">Tap to select from gallery</p>
                  </div>
                ) : (
                  <div className="relative w-full">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Button 
                      variant="outline" 
                      className="absolute top-2 right-2 bg-white/80"
                      onClick={() => setImagePreview(null)}
                    >
                      Change
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Button 
          className="w-full bg-wasfah-bright-teal hover:bg-wasfah-deep-teal"
          disabled={!imagePreview || isProcessing}
          onClick={handleProcessImage}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Image...
            </>
          ) : (
            'Analyze with AI'
          )}
        </Button>

        {showResults && (
          <div className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-wasfah-deep-teal">Ingredients Identified</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {ingredients.map((ingredient, idx) => (
                    <div key={idx} className="flex justify-between p-2 bg-gray-50 rounded-md">
                      <div className="font-medium">{ingredient.name}</div>
                      <div className="text-gray-500">{ingredient.quantity}</div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4 text-wasfah-bright-teal border-wasfah-bright-teal"
                  onClick={handleSaveToShoppingList}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Shopping List
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-wasfah-deep-teal">Nutritional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 bg-gray-50 rounded-md text-center">
                    <div className="text-lg font-bold">{nutrition.calories}</div>
                    <div className="text-xs text-gray-500">calories</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md text-center">
                    <div className="text-lg font-bold">{nutrition.protein}g</div>
                    <div className="text-xs text-gray-500">protein</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md text-center">
                    <div className="text-lg font-bold">{nutrition.carbs}g</div>
                    <div className="text-xs text-gray-500">carbs</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md text-center">
                    <div className="text-lg font-bold">{nutrition.fat}g</div>
                    <div className="text-xs text-gray-500">fats</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md text-center">
                    <div className="text-lg font-bold">{nutrition.sugar}g</div>
                    <div className="text-xs text-gray-500">sugar</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md text-center">
                    <div className="text-lg font-bold">{nutrition.fiber}g</div>
                    <div className="text-xs text-gray-500">fiber</div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4 text-wasfah-bright-teal border-wasfah-bright-teal"
                  onClick={handleSaveToHealth}
                >
                  <Activity className="mr-2 h-4 w-4" />
                  Add to Health Tracking
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
