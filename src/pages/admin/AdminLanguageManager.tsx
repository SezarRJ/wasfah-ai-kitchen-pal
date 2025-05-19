
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit2, Trash2, Save, RotateCcw, Languages, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Language {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
  completionPercentage: number;
}

interface TranslationKey {
  id: string;
  key: string;
  english: string;
  translations: { [langCode: string]: string };
}

const mockLanguages: Language[] = [
  { id: '1', name: 'English', code: 'en', isActive: true, completionPercentage: 100 },
  { id: '2', name: 'Arabic', code: 'ar', isActive: true, completionPercentage: 92 },
  { id: '3', name: 'Spanish', code: 'es', isActive: true, completionPercentage: 87 },
  { id: '4', name: 'French', code: 'fr', isActive: false, completionPercentage: 65 },
  { id: '5', name: 'Chinese', code: 'zh', isActive: false, completionPercentage: 43 },
];

const mockTranslationKeys: TranslationKey[] = [
  { 
    id: '1', 
    key: 'nav.home', 
    english: 'Home',
    translations: { ar: 'الرئيسية', es: 'Inicio', fr: 'Accueil', zh: '首页' }
  },
  { 
    id: '2', 
    key: 'nav.recipes', 
    english: 'Recipes',
    translations: { ar: 'وصفات', es: 'Recetas', fr: 'Recettes', zh: '食谱' }
  },
  { 
    id: '3', 
    key: 'nav.mealPlan', 
    english: 'Meal Plan',
    translations: { ar: 'خطة الوجبات', es: 'Plan de comidas', fr: 'Plan de repas', zh: '膳食计划' }
  },
];

const AdminLanguageManager: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>(mockLanguages);
  const [translationKeys, setTranslationKeys] = useState<TranslationKey[]>(mockTranslationKeys);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('ar');
  const [editingTranslation, setEditingTranslation] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { toast } = useToast();

  const handleToggleLanguage = (id: string) => {
    setLanguages(languages.map(lang => 
      lang.id === id ? { ...lang, isActive: !lang.isActive } : lang
    ));
    
    toast({
      title: 'Language Status Updated',
      description: `Language availability has been updated.`,
    });
  };

  const handleSaveTranslation = (keyId: string, value: string) => {
    setTranslationKeys(
      translationKeys.map(tk => 
        tk.id === keyId 
          ? { 
              ...tk, 
              translations: { 
                ...tk.translations, 
                [selectedLanguage]: value 
              } 
            } 
          : tk
      )
    );
    
    setEditingTranslation(null);
    toast({
      title: 'Translation Saved',
      description: 'The translation has been updated successfully.',
    });
  };

  const filteredKeys = translationKeys.filter(tk => 
    tk.key.toLowerCase().includes(searchTerm.toLowerCase()) || 
    tk.english.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold flex items-center">
            <Languages className="mr-2 h-6 w-6" /> Language Management
          </h1>
          <p className="text-muted-foreground">Manage languages and translations for your app</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Language
        </Button>
      </div>

      <Tabs defaultValue="languages">
        <TabsList className="mb-4">
          <TabsTrigger value="languages">Available Languages</TabsTrigger>
          <TabsTrigger value="translations">Translations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="languages">
          <Card>
            <CardHeader>
              <CardTitle>Supported Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Language</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Completion</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {languages.map((language) => (
                      <TableRow key={language.id}>
                        <TableCell className="font-medium">{language.name}</TableCell>
                        <TableCell>{language.code}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            language.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {language.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div 
                              className="bg-wasfah-bright-teal h-2.5 rounded-full" 
                              style={{ width: `${language.completionPercentage}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 mt-1">{language.completionPercentage}%</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              onClick={() => handleToggleLanguage(language.id)} 
                              variant="outline" 
                              size="sm"
                            >
                              {language.isActive ? 'Deactivate' : 'Activate'}
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="translations">
          <Card>
            <CardHeader className="space-y-4">
              <CardTitle>Manage Translations</CardTitle>
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="relative w-full md:w-auto md:flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search translation keys..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <div className="flex-shrink-0">
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                  >
                    {languages.filter(l => l.code !== 'en').map((lang) => (
                      <option key={lang.id} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Key</TableHead>
                      <TableHead>English (Source)</TableHead>
                      <TableHead>Translation</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredKeys.map((tk) => (
                      <TableRow key={tk.id}>
                        <TableCell className="font-mono text-sm">{tk.key}</TableCell>
                        <TableCell>{tk.english}</TableCell>
                        <TableCell>
                          {editingTranslation === tk.id ? (
                            <Input 
                              defaultValue={tk.translations[selectedLanguage] || ''}
                              id={`translation-${tk.id}`}
                              autoFocus
                            />
                          ) : (
                            <span 
                              className={!tk.translations[selectedLanguage] ? 'text-gray-400 italic' : ''}
                            >
                              {tk.translations[selectedLanguage] || 'Not translated'}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingTranslation === tk.id ? (
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                onClick={() => handleSaveTranslation(
                                  tk.id, 
                                  (document.getElementById(`translation-${tk.id}`) as HTMLInputElement).value
                                )}
                              >
                                <Save className="h-4 w-4 mr-1" /> Save
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => setEditingTranslation(null)}
                              >
                                <RotateCcw className="h-4 w-4 mr-1" /> Cancel
                              </Button>
                            </div>
                          ) : (
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => setEditingTranslation(tk.id)}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminLanguageManager;
