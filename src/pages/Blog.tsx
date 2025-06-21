
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

interface BlogPost {
  id: string;
  title: { zh: string; en: string };
  excerpt: { zh: string; en: string };
  content: { zh: string; en: string };
  author: string;
  publishedAt: string;
  tags: string[];
  slug: string;
  featured: boolean;
}

export default function Blog() {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockPosts: BlogPost[] = [
      {
        id: '1',
        title: {
          zh: '2024年最佳生产力工具推荐',
          en: 'Best Productivity Tools of 2024'
        },
        excerpt: {
          zh: '探索最新的生产力工具，提升你的工作效率。从项目管理到自动化工具，全面覆盖现代工作流程。',
          en: 'Explore the latest productivity tools to boost your work efficiency. From project management to automation tools, comprehensive coverage of modern workflows.'
        },
        content: {
          zh: '完整的中文文章内容...',
          en: 'Complete English article content...'
        },
        author: 'Admin',
        publishedAt: '2024-01-15',
        tags: i18n.language === 'zh' ? ['生产力', '工具', '效率'] : ['Productivity', 'Tools', 'Efficiency'],
        slug: '2024-best-productivity-tools',
        featured: true
      },
      {
        id: '2',
        title: {
          zh: 'AI工具如何改变我们的工作方式',
          en: 'How AI Tools Are Changing Our Work Methods'
        },
        excerpt: {
          zh: '人工智能正在重塑我们的工作流程，了解如何利用AI工具提升工作效率和创造力。',
          en: 'Artificial intelligence is reshaping our workflows. Learn how to leverage AI tools to enhance productivity and creativity.'
        },
        content: {
          zh: '完整的中文文章内容...',
          en: 'Complete English article content...'
        },
        author: 'Editor',
        publishedAt: '2024-01-10',
        tags: i18n.language === 'zh' ? ['AI', '工作流程', '未来'] : ['AI', 'Workflow', 'Future'],
        slug: 'ai-tools-changing-work',
        featured: false
      },
      {
        id: '3',
        title: {
          zh: '远程办公必备工具指南',
          en: 'Essential Remote Work Tools Guide'
        },
        excerpt: {
          zh: '远程工作成为新常态，这些工具将帮助你建立高效的远程办公环境。',
          en: 'Remote work has become the new normal. These tools will help you establish an efficient remote office environment.'
        },
        content: {
          zh: '完整的中文文章内容...',
          en: 'Complete English article content...'
        },
        author: 'Tech Writer',
        publishedAt: '2024-01-05',
        tags: i18n.language === 'zh' ? ['远程办公', '协作', '通讯'] : ['Remote Work', 'Collaboration', 'Communication'],
        slug: 'remote-work-tools-guide',
        featured: false
      }
    ];
    
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, [i18n.language]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              Gadget Guru
            </Link>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                {t('nav.home')}
              </Link>
              <Link to="/blog" className="text-gray-900 font-medium">
                {t('nav.blog')}
              </Link>
              <Link to="/submit" className="text-gray-600 hover:text-gray-900">
                {t('nav.submit')}
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('blog.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-2 mb-3">
                  {post.featured && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      {i18n.language === 'zh' ? '精选' : 'Featured'}
                    </Badge>
                  )}
                  <div className="flex items-center text-sm text-gray-500 gap-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.publishedAt}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {post.title[i18n.language as 'zh' | 'en']}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt[i18n.language as 'zh' | 'en']}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Link to={`/blog/${post.slug}`}>
                  <Button variant="ghost" className="group/btn p-0 h-auto">
                    {t('blog.readMore')}
                    <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
