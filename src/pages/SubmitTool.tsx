
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { AutoScrapeForm } from '@/components/AutoScrapeForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SubmitTool() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    category: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('user_tools')
        .insert({
          name: formData.name,
          description: formData.description,
          url: formData.url,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: t('submit.success'),
        description: t('submit.successMessage'),
      });

      // Reset form
      setFormData({
        name: '',
        description: '',
        url: '',
        category: ''
      });
    } catch (error) {
      console.error('Error submitting tool:', error);
      toast({
        title: t('submit.error'),
        description: t('submit.errorMessage'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              Gadget Guru
            </Link>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                {t('nav.home')}
              </Link>
              <Link to="/blog" className="text-gray-600 hover:text-gray-900">
                {t('nav.blog')}
              </Link>
              <Link to="/submit" className="text-gray-900 font-medium">
                {t('nav.submit')}
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('submit.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('submit.subtitle')}
          </p>
        </div>

        <Tabs defaultValue="auto" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="auto">{t('submit.autoScrape')}</TabsTrigger>
            <TabsTrigger value="manual">{t('submit.manualSubmit')}</TabsTrigger>
          </TabsList>

          <TabsContent value="auto">
            <AutoScrapeForm />
          </TabsContent>

          <TabsContent value="manual">
            <Card>
              <CardHeader>
                <CardTitle>{t('submit.manualForm')}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('submit.toolName')}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder={t('submit.toolNamePlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('submit.url')}
                    </label>
                    <Input
                      id="url"
                      name="url"
                      type="url"
                      value={formData.url}
                      onChange={handleInputChange}
                      required
                      placeholder={t('submit.urlPlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('submit.description')}
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder={t('submit.descriptionPlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('submit.category')}
                    </label>
                    <Input
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      placeholder={t('submit.categoryPlaceholder')}
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? t('submit.submitting') : t('submit.submitButton')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
