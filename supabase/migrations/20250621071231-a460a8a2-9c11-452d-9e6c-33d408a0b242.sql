
-- 创建广告管理表
CREATE TABLE public.ads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  position TEXT NOT NULL, -- 'header', 'sidebar', 'footer', 'content'
  size TEXT NOT NULL, -- '728x90', '300x250', '320x50' etc
  content TEXT NOT NULL, -- HTML content or image URL
  url TEXT, -- click target URL
  is_active BOOLEAN NOT NULL DEFAULT true,
  priority INTEGER NOT NULL DEFAULT 0,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 创建广告点击统计表
CREATE TABLE public.ad_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ad_id UUID REFERENCES public.ads(id) ON DELETE CASCADE,
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_ip TEXT,
  user_agent TEXT,
  referrer TEXT
);

-- 创建邮件订阅表
CREATE TABLE public.subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  tags TEXT[] DEFAULT '{}',
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- 创建工具抓取任务表
CREATE TABLE public.scrape_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'running', 'completed', 'failed'
  result JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- 创建webhook配置表
CREATE TABLE public.webhooks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  events TEXT[] NOT NULL, -- ['tool_added', 'tool_updated', 'user_subscribed']
  is_active BOOLEAN NOT NULL DEFAULT true,
  secret TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 创建工具批量导入表
CREATE TABLE public.import_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  total_count INTEGER NOT NULL DEFAULT 0,
  success_count INTEGER NOT NULL DEFAULT 0,
  error_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  errors JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- 添加索引
CREATE INDEX idx_ads_position_active ON public.ads(position, is_active);
CREATE INDEX idx_ads_dates ON public.ads(start_date, end_date);
CREATE INDEX idx_ad_clicks_ad_id ON public.ad_clicks(ad_id);
CREATE INDEX idx_ad_clicks_date ON public.ad_clicks(clicked_at);
CREATE INDEX idx_subscribers_email ON public.subscribers(email);
CREATE INDEX idx_scrape_tasks_status ON public.scrape_tasks(status);
CREATE INDEX idx_webhooks_active ON public.webhooks(is_active);
CREATE INDEX idx_import_tasks_status ON public.import_tasks(status);

-- 添加更新时间触发器
CREATE TRIGGER update_ads_updated_at
  BEFORE UPDATE ON public.ads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_timestamp();
