
interface ShareData {
  title: string;
  text: string;
  url: string;
}

export const socialShare = {
  // 通用分享（使用Web Share API）
  share: async (data: ShareData) => {
    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // 回退到复制链接
      await navigator.clipboard.writeText(data.url);
      alert('链接已复制到剪贴板');
    }
  },

  // 微信分享（实际需要微信JSSDK）
  wechat: (data: ShareData) => {
    // 这里简化处理，实际应用中需要集成微信JSSDK
    const shareUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data.url)}`;
    window.open(shareUrl, '_blank');
  },

  // 微博分享
  weibo: (data: ShareData) => {
    const url = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(data.url)}&title=${encodeURIComponent(data.title)}&pic=`;
    window.open(url, '_blank', 'width=600,height=300');
  },

  // QQ分享
  qq: (data: ShareData) => {
    const url = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(data.url)}&title=${encodeURIComponent(data.title)}&summary=${encodeURIComponent(data.text)}`;
    window.open(url, '_blank', 'width=600,height=300');
  },

  // Twitter分享
  twitter: (data: ShareData) => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(data.title)}&url=${encodeURIComponent(data.url)}`;
    window.open(url, '_blank', 'width=600,height=300');
  },

  // Facebook分享
  facebook: (data: ShareData) => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.url)}`;
    window.open(url, '_blank', 'width=600,height=300');
  },

  // LinkedIn分享
  linkedin: (data: ShareData) => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(data.url)}`;
    window.open(url, '_blank', 'width=600,height=300');
  },

  // 复制链接
  copyLink: async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch (error) {
      console.error('Error copying link:', error);
      return false;
    }
  }
};
