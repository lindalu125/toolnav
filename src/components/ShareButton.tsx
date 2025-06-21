
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Share2, Copy, Check } from 'lucide-react';
import { socialShare } from '@/utils/socialShare';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
  className?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ 
  title, 
  text, 
  url, 
  className = '' 
}) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleShare = async (platform: string) => {
    const shareData = { title, text, url };

    switch (platform) {
      case 'native':
        await socialShare.share(shareData);
        break;
      case 'wechat':
        socialShare.wechat(shareData);
        break;
      case 'weibo':
        socialShare.weibo(shareData);
        break;
      case 'qq':
        socialShare.qq(shareData);
        break;
      case 'twitter':
        socialShare.twitter(shareData);
        break;
      case 'facebook':
        socialShare.facebook(shareData);
        break;
      case 'linkedin':
        socialShare.linkedin(shareData);
        break;
      case 'copy':
        const success = await socialShare.copyLink(url);
        if (success) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          toast({
            title: "成功",
            description: "链接已复制到剪贴板"
          });
        }
        break;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <Share2 className="h-4 w-4 mr-2" />
          分享
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {navigator.share && (
          <DropdownMenuItem onClick={() => handleShare('native')}>
            <Share2 className="h-4 w-4 mr-2" />
            系统分享
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => handleShare('wechat')}>
          💬 微信
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('weibo')}>
          🔥 微博
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('qq')}>
          🐧 QQ
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('twitter')}>
          🐦 Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('facebook')}>
          📘 Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('linkedin')}>
          💼 LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('copy')}>
          {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
          {copied ? '已复制' : '复制链接'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
