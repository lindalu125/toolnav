
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Ad } from '@/types/ads';

interface AdBannerProps {
  position: 'header' | 'sidebar' | 'footer' | 'content';
  size?: string;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ position, size, className = '' }) => {
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAd();
  }, [position]);

  const fetchAd = async () => {
    try {
      const now = new Date().toISOString();
      let query = supabase
        .from('ads')
        .select('*')
        .eq('position', position)
        .eq('is_active', true)
        .or(`start_date.is.null,start_date.lte.${now}`)
        .or(`end_date.is.null,end_date.gte.${now}`)
        .order('priority', { ascending: false });

      if (size) {
        query = query.eq('size', size);
      }

      const { data, error } = await query.limit(1).single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching ad:', error);
        return;
      }

      setAd(data);
    } catch (error) {
      console.error('Error fetching ad:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async () => {
    if (!ad) return;

    try {
      // 记录点击
      await supabase.from('ad_clicks').insert({
        ad_id: ad.id,
        user_agent: navigator.userAgent,
        referrer: document.referrer
      });

      // 打开链接
      if (ad.url) {
        window.open(ad.url, '_blank');
      }
    } catch (error) {
      console.error('Error recording ad click:', error);
    }
  };

  if (loading || !ad) {
    return null;
  }

  return (
    <div 
      className={`ad-banner ${className}`}
      style={{ 
        minHeight: ad.size.split('x')[1] + 'px',
        width: ad.size.split('x')[0] + 'px',
        maxWidth: '100%'
      }}
      onClick={handleClick}
    >
      <div 
        dangerouslySetInnerHTML={{ __html: ad.content }}
        className="cursor-pointer"
      />
    </div>
  );
};
