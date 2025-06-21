
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ImportTools } from '@/components/admin/ImportTools';
import { AdManagement } from '@/components/admin/AdManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Mail, Webhook, Upload, Ad } from 'lucide-react';
import type { Webhook, Subscriber, ScrapeTask } from '@/types/ads';

export const AdminIntegrations = () => {
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [scrapeTasks, setScrapeTasks] = useState<ScrapeTask[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [webhookForm, setWebhookForm] = useState({
    name: '',
    url: '',
    events: [] as string[],
    secret: ''
  });

  const [scrapeUrl, setScrapeUrl] = useState('');
  const [scraping, setScraping] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [webhooksRes, subscribersRes, scrapeTasksRes] = await Promise.all([
        supabase.from('webhooks').select('*').order('created_at', { ascending: false }),
        supabase.from('subscribers').select('*').order('subscribed_at', { ascending: false }),
        supabase.from('scrape_tasks').select('*').order('created_at', { ascending: false }).limit(10)
      ]);

      if (webhooksRes.error) throw webhooksRes.error;
      if (subscribersRes.error) throw subscribersRes.error;
      if (scrapeTasksRes.error) throw scrapeTasksRes.error;

      setWebhooks(webhooksRes.data || []);
      setSubscribers(subscribersRes.data || []);
      setScrapeTasks(scrapeTasksRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "错误",
        description: "获取数据失败",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWebhookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('webhooks')
        .insert([{
          ...webhookForm,
          events: webhookForm.events.length > 0 ? webhookForm.events : ['tool_added']
        }]);

      if (error) throw error;
      
      toast({
        title: "成功",
        description: "Webhook创建成功"
      });
      
      setWebhookForm({ name: '', url: '', events: [], secret: '' });
      fetchData();
    } catch (error) {
      console.error('Error creating webhook:', error);
      toast({
        title: "错误",
        description: "创建Webhook失败",
        variant: "destructive"
      });
    }
  };

  const toggleWebhook = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('webhooks')
        .update({ is_active: isActive })
        .eq('id', id);

      if (error) throw error;
      fetchData();
      toast({
        title: "成功",
        description: `Webhook已${isActive ? '启用' : '禁用'}`
      });
    } catch (error) {
      console.error('Error toggling webhook:', error);
      toast({
        title: "错误",
        description: "操作失败",
        variant: "destructive"
      });
    }
  };

  const handleScrape = async () => {
    if (!scrapeUrl.trim()) return;

    setScraping(true);
    try {
      const response = await fetch('/functions/v1/scrape-tool', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabase.supabaseKey}`
        },
        body: JSON.stringify({ url: scrapeUrl.trim() })
      });

      if (!response.ok) throw new Error('抓取请求失败');

      const result = await response.json();
      toast({
        title: "成功",
        description: "工具信息抓取已开始"
      });
      
      setScrapeUrl('');
      setTimeout(fetchData, 2000); // 2秒后刷新数据
    } catch (error) {
      console.error('Error scraping:', error);
      toast({
        title: "错误",
        description: "抓取失败",
        variant: "destructive"
      });
    } finally {
      setScraping(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">加载中...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">集成管理</h2>

      <Tabs defaultValue="ads" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="ads">
            <Ad className="h-4 w-4 mr-2" />
            广告管理
          </TabsTrigger>
          <TabsTrigger value="scrape">
            <Globe className="h-4 w-4 mr-2" />
            工具抓取
          </TabsTrigger>
          <TabsTrigger value="subscribers">
            <Mail className="h-4 w-4 mr-2" />
            邮件订阅
          </TabsTrigger>
          <TabsTrigger value="webhooks">
            <Webhook className="h-4 w-4 mr-2" />
            Webhook
          </TabsTrigger>
          <TabsTrigger value="import">
            <Upload className="h-4 w-4 mr-2" />
            批量导入
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ads">
          <AdManagement />
        </TabsContent>

        <TabsContent value="scrape" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>工具信息抓取</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="输入要抓取的工具网站URL"
                  value={scrapeUrl}
                  onChange={(e) => setScrapeUrl(e.target.value)}
                />
                <Button onClick={handleScrape} disabled={scraping}>
                  {scraping ? '抓取中...' : '开始抓取'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>抓取历史</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {scrapeTasks.map((task) => (
                  <div key={task.id} className="flex justify-between items-center p-3 border rounded">
                    <div className="flex-1">
                      <p className="font-medium">{task.url}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(task.created_at).toLocaleString()}
                      </p>
                      {task.result && (
                        <p className="text-sm text-green-600">
                          标题: {task.result.title}
                        </p>
                      )}
                      {task.error_message && (
                        <p className="text-sm text-red-600">
                          错误: {task.error_message}
                        </p>
                      )}
                    </div>
                    <Badge variant={
                      task.status === 'completed' ? 'default' : 
                      task.status === 'failed' ? 'destructive' : 
                      'secondary'
                    }>
                      {task.status === 'completed' ? '完成' :
                       task.status === 'failed' ? '失败' :
                       task.status === 'running' ? '运行中' : '等待'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscribers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>邮件订阅列表 ({subscribers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {subscribers.map((subscriber) => (
                  <div key={subscriber.id} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">{subscriber.email}</p>
                      <p className="text-sm text-gray-500">
                        订阅时间: {new Date(subscriber.subscribed_at).toLocaleString()}
                      </p>
                    </div>
                    <Badge variant={subscriber.is_active ? 'default' : 'secondary'}>
                      {subscriber.is_active ? '活跃' : '已取消'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>添加Webhook</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleWebhookSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="webhookName">名称</Label>
                    <Input
                      id="webhookName"
                      value={webhookForm.name}
                      onChange={(e) => setWebhookForm({...webhookForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="webhookUrl">URL</Label>
                    <Input
                      id="webhookUrl"
                      type="url"
                      value={webhookForm.url}
                      onChange={(e) => setWebhookForm({...webhookForm, url: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="webhookSecret">密钥 (可选)</Label>
                  <Input
                    id="webhookSecret"
                    value={webhookForm.secret}
                    onChange={(e) => setWebhookForm({...webhookForm, secret: e.target.value})}
                  />
                </div>
                <Button type="submit">创建Webhook</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Webhook列表</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {webhooks.map((webhook) => (
                  <div key={webhook.id} className="flex justify-between items-center p-3 border rounded">
                    <div className="flex-1">
                      <p className="font-medium">{webhook.name}</p>
                      <p className="text-sm text-gray-500">{webhook.url}</p>
                      <div className="flex space-x-1 mt-1">
                        {webhook.events.map((event) => (
                          <Badge key={event} variant="outline" className="text-xs">
                            {event}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Switch
                      checked={webhook.is_active}
                      onCheckedChange={(checked) => toggleWebhook(webhook.id, checked)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="import">
          <ImportTools />
        </TabsContent>
      </Tabs>
    </div>
  );
};
