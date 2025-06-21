
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Search, ExternalLink, Loader2 } from 'lucide-react';

interface ToolInfo {
  title: string;
  description: string;
  favicon: string;
  screenshots?: string[];
  features?: string[];
  pricing?: string;
  category?: string;
}

export const AutoScrapeForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scrapedData, setScrapedData] = useState<ToolInfo | null>(null);

  const handleScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('scrape-tool-info', {
        body: { url }
      });

      if (error) throw error;

      if (data.success) {
        setScrapedData(data.data);
        toast({
          title: t('scrape.success'),
          description: t('scrape.successDesc'),
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Scraping error:', error);
      toast({
        title: t('scrape.error'),
        description: t('scrape.errorDesc'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToDatabase = async () => {
    if (!scrapedData || !url) return;

    try {
      const { error } = await supabase
        .from('user_tools')
        .insert({
          name: scrapedData.title,
          description: scrapedData.description,
          url: url,
          favicon: scrapedData.favicon,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: t('scrape.saved'),
        description: t('scrape.savedDesc'),
      });

      // Reset form
      setUrl('');
      setScrapedData(null);
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: t('scrape.saveError'),
        description: t('scrape.saveErrorDesc'),
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>{t('scrape.title')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleScrape} className="space-y-4">
            <div>
              <Input
                type="url"
                placeholder={t('scrape.urlPlaceholder')}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t('scrape.scraping')}
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  {t('scrape.scrapeButton')}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {scrapedData && (
        <Card>
          <CardHeader>
            <CardTitle>{t('scrape.results')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-4">
              {scrapedData.favicon && (
                <img
                  src={scrapedData.favicon}
                  alt="Favicon"
                  className="w-8 h-8 rounded"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{scrapedData.title}</h3>
                <p className="text-gray-600 mt-1">{scrapedData.description}</p>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {scrapedData.features && scrapedData.features.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">{t('scrape.features')}</h4>
                <div className="flex flex-wrap gap-2">
                  {scrapedData.features.map((feature, index) => (
                    <Badge key={index} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {scrapedData.screenshots && scrapedData.screenshots.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">{t('scrape.screenshots')}</h4>
                <div className="flex space-x-2">
                  {scrapedData.screenshots.map((screenshot, index) => (
                    <img
                      key={index}
                      src={screenshot}
                      alt={`Screenshot ${index + 1}`}
                      className="w-20 h-20 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <Button onClick={handleSaveToDatabase} className="w-full">
              {t('scrape.saveToDatabase')}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
