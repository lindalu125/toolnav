
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, ExternalLink, Star, TrendingUp, Clock, Users } from 'lucide-react';
import { LazyImage } from '@/components/LazyImage';
import { AdBanner } from '@/components/AdBanner';
import { SubscriptionForm } from '@/components/SubscriptionForm';
import { ShareButton } from '@/components/ShareButton';
import { SEOHead } from '@/components/SEOHead';
import { usePerformance } from '@/hooks/usePerformance';

interface Tool {
  id: number;
  name: string;
  description: string;
  url: string;
  created_at: string;
  status: string;
  favicon?: string;
}

const Index = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  // 性能监控
  usePerformance();

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const { data, error } = await supabase
        .from('user_tools')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTools(data || []);
    } catch (error) {
      console.error('Error fetching tools:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="AI工具导航 - 发现最新最热门的AI工具"
        description="探索最新最热门的AI工具，包括ChatGPT、Midjourney、Stable Diffusion等，助力提升工作效率"
        keywords="AI工具,人工智能,ChatGPT,Midjourney,AI导航,工具导航"
        canonical="https://your-domain.com"
      />

      {/* 顶部横幅广告 */}
      <AdBanner position="header" size="728x90" className="flex justify-center py-4 bg-white border-b" />

      <div className="container mx-auto px-4 py-8">
        {/* 头部区域 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            AI工具导航
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            发现最新最热门的AI工具，助力提升您的工作效率
          </p>
          
          {/* 搜索框 */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="搜索AI工具..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
          </div>

          {/* 统计信息 */}
          <div className="flex justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">{tools.length}</span>
              </div>
              <p className="text-gray-600">AI工具</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2">
                <Users className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">10K+</span>
              </div>
              <p className="text-gray-600">用户</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2">
                <Star className="h-5 w-5 text-yellow-600" />
                <span className="text-2xl font-bold text-gray-900">4.9</span>
              </div>
              <p className="text-gray-600">评分</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* 主内容区域 */}
          <div className="flex-1">
            {/* 工具网格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredTools.map((tool) => (
                <Card key={tool.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {tool.favicon && (
                          <LazyImage
                            src={tool.favicon}
                            alt={`${tool.name} favicon`}
                            className="w-8 h-8 rounded"
                            fallback="/placeholder.svg"
                          />
                        )}
                        <CardTitle className="text-lg line-clamp-1">{tool.name}</CardTitle>
                      </div>
                      <Badge variant="secondary">AI工具</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 line-clamp-2">{tool.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{new Date(tool.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex space-x-2">
                        <ShareButton
                          title={tool.name}
                          text={tool.description}
                          url={tool.url}
                        />
                        <Button size="sm" asChild>
                          <a href={tool.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            访问
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 内容区广告 */}
            <AdBanner position="content" size="728x90" className="flex justify-center mb-8" />

            {filteredTools.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">没有找到匹配的工具</p>
                <p className="text-gray-400">尝试使用其他关键词搜索</p>
              </div>
            )}
          </div>

          {/* 侧边栏 */}
          <div className="lg:w-80 space-y-6">
            {/* 侧边栏广告 */}
            <AdBanner position="sidebar" size="300x250" />

            {/* 邮件订阅 */}
            <Card>
              <CardContent className="p-6">
                <SubscriptionForm />
              </CardContent>
            </Card>

            {/* 热门工具 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>热门工具</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tools.slice(0, 5).map((tool) => (
                    <div key={tool.id} className="flex items-center space-x-3">
                      {tool.favicon && (
                        <LazyImage
                          src={tool.favicon}
                          alt={`${tool.name} favicon`}
                          className="w-6 h-6 rounded"
                          fallback="/placeholder.svg"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{tool.name}</p>
                        <p className="text-xs text-gray-500 truncate">{tool.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 底部区域 */}
        <div className="mt-12 pt-8 border-t">
          {/* 底部广告 */}
          <AdBanner position="footer" size="728x90" className="flex justify-center mb-8" />

          <div className="text-center text-gray-600">
            <p>© 2024 AI工具导航. 发现更多优质AI工具.</p>
            <div className="mt-4 space-x-4">
              <a href="/admin" className="text-blue-600 hover:underline">管理后台</a>
              <a href="#" className="text-blue-600 hover:underline">关于我们</a>
              <a href="#" className="text-blue-600 hover:underline">联系我们</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
