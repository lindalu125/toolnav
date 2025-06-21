
interface ToolInfo {
  title: string;
  description: string;
  favicon: string;
  screenshots?: string[];
  features?: string[];
  pricing?: string;
  category?: string;
}

export class ToolScraper {
  static async scrapeToolInfo(url: string): Promise<ToolInfo | null> {
    try {
      // 这里使用 Supabase Edge Function 来进行网页抓取
      const response = await fetch('/functions/v1/scrape-tool', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url })
      });

      if (!response.ok) {
        throw new Error('Failed to scrape tool information');
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error scraping tool:', error);
      return null;
    }
  }

  static extractMetadata(html: string): ToolInfo {
    // 创建虚拟DOM来解析HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // 提取标题
    const title = doc.querySelector('title')?.textContent || 
                  doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || 
                  doc.querySelector('h1')?.textContent || '';

    // 提取描述
    const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') ||
                       doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';

    // 提取图标
    const favicon = doc.querySelector('link[rel="icon"]')?.getAttribute('href') ||
                   doc.querySelector('link[rel="shortcut icon"]')?.getAttribute('href') || '';

    // 提取截图（从 og:image 或其他图片）
    const screenshots: string[] = [];
    const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content');
    if (ogImage) screenshots.push(ogImage);

    // 尝试提取功能特点（从常见的HTML结构）
    const features: string[] = [];
    const featureElements = doc.querySelectorAll('[class*="feature"], [class*="benefit"], li');
    featureElements.forEach(el => {
      const text = el.textContent?.trim();
      if (text && text.length > 10 && text.length < 100) {
        features.push(text);
      }
    });

    return {
      title: title.trim(),
      description: description.trim(),
      favicon,
      screenshots,
      features: features.slice(0, 5), // 最多5个特点
    };
  }
}
