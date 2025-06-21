
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import type { Ad } from '@/types/ads';

export const AdManagement = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    position: 'sidebar' as const,
    size: '300x250',
    content: '',
    url: '',
    is_active: true,
    priority: 0,
    start_date: '',
    end_date: ''
  });

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAds(data || []);
    } catch (error) {
      console.error('Error fetching ads:', error);
      toast({
        title: "错误",
        description: "获取广告列表失败",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const adData = {
        ...formData,
        start_date: formData.start_date || null,
        end_date: formData.end_date || null
      };

      if (editingAd) {
        const { error } = await supabase
          .from('ads')
          .update(adData)
          .eq('id', editingAd.id);

        if (error) throw error;
        toast({
          title: "成功",
          description: "广告更新成功"
        });
      } else {
        const { error } = await supabase
          .from('ads')
          .insert([adData]);

        if (error) throw error;
        toast({
          title: "成功",
          description: "广告创建成功"
        });
      }

      setShowForm(false);
      setEditingAd(null);
      resetForm();
      fetchAds();
    } catch (error) {
      console.error('Error saving ad:', error);
      toast({
        title: "错误",
        description: "保存广告失败",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      position: 'sidebar',
      size: '300x250',
      content: '',
      url: '',
      is_active: true,
      priority: 0,
      start_date: '',
      end_date: ''
    });
  };

  const handleEdit = (ad: Ad) => {
    setEditingAd(ad);
    setFormData({
      title: ad.title,
      position: ad.position,
      size: ad.size,
      content: ad.content,
      url: ad.url || '',
      is_active: ad.is_active,
      priority: ad.priority,
      start_date: ad.start_date ? ad.start_date.split('T')[0] : '',
      end_date: ad.end_date ? ad.end_date.split('T')[0] : ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个广告吗？')) return;

    try {
      const { error } = await supabase
        .from('ads')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "成功",
        description: "广告删除成功"
      });
      fetchAds();
    } catch (error) {
      console.error('Error deleting ad:', error);
      toast({
        title: "错误",
        description: "删除广告失败",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">加载中...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">广告管理</h2>
        <Button onClick={() => setShowForm(true)}>
          添加广告
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingAd ? '编辑广告' : '添加广告'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">标题</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="position">位置</Label>
                  <Select value={formData.position} onValueChange={(value: any) => setFormData({...formData, position: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="header">顶部</SelectItem>
                      <SelectItem value="sidebar">侧边栏</SelectItem>
                      <SelectItem value="footer">底部</SelectItem>
                      <SelectItem value="content">内容区</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="size">尺寸</Label>
                  <Select value={formData.size} onValueChange={(value) => setFormData({...formData, size: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="728x90">728x90 (横幅)</SelectItem>
                      <SelectItem value="300x250">300x250 (矩形)</SelectItem>
                      <SelectItem value="320x50">320x50 (移动横幅)</SelectItem>
                      <SelectItem value="160x600">160x600 (宽摩天大楼)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">优先级</Label>
                  <Input
                    id="priority"
                    type="number"
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="content">广告内容 (HTML)</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="url">点击链接 (可选)</Label>
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_date">开始日期 (可选)</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="end_date">结束日期 (可选)</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({...formData, is_active: checked})}
                />
                <Label htmlFor="is_active">启用</Label>
              </div>

              <div className="flex space-x-2">
                <Button type="submit">
                  {editingAd ? '更新' : '创建'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowForm(false);
                    setEditingAd(null);
                    resetForm();
                  }}
                >
                  取消
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {ads.map((ad) => (
          <Card key={ad.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold">{ad.title}</h3>
                    <Badge variant={ad.is_active ? "default" : "secondary"}>
                      {ad.is_active ? '启用' : '禁用'}
                    </Badge>
                    <Badge variant="outline">{ad.position}</Badge>
                    <Badge variant="outline">{ad.size}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    优先级: {ad.priority}
                  </p>
                  {ad.url && (
                    <p className="text-sm text-blue-600 mb-2">
                      链接: {ad.url}
                    </p>
                  )}
                  <div className="text-xs text-gray-500">
                    创建: {new Date(ad.created_at).toLocaleDateString()}
                    {ad.start_date && ` | 开始: ${new Date(ad.start_date).toLocaleDateString()}`}
                    {ad.end_date && ` | 结束: ${new Date(ad.end_date).toLocaleDateString()}`}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" onClick={() => handleEdit(ad)}>
                    编辑
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(ad.id)}>
                    删除
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
