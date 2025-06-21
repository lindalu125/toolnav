
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

interface SubscriptionFormProps {
  className?: string;
}

export const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email: email.trim() }]);

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "提示",
            description: "该邮箱已经订阅过了",
            variant: "destructive"
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "成功",
          description: "订阅成功！感谢您的关注"
        });
        setEmail('');

        // 触发webhook通知
        try {
          await fetch('/api/webhook/trigger', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event: 'user_subscribed',
              data: { email: email.trim() }
            })
          });
        } catch (webhookError) {
          console.error('Webhook trigger failed:', webhookError);
        }
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      toast({
        title: "错误",
        description: "订阅失败，请稍后重试",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        <Mail className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">订阅更新</h3>
      </div>
      <p className="text-gray-600 mb-4">
        订阅我们的邮件列表，获取最新的工具推荐和网站更新。
      </p>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          type="email"
          placeholder="输入您的邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" disabled={loading}>
          {loading ? '订阅中...' : '订阅'}
        </Button>
      </form>
    </div>
  );
};
