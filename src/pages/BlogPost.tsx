
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ShareButton } from '@/components/ShareButton';

interface BlogPost {
  id: string;
  title: { zh: string; en: string };
  content: { zh: string; en: string };
  author: string;
  publishedAt: string;
  tags: string[];
  slug: string;
}

export default function BlogPost() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const mockPosts: { [key: string]: BlogPost } = {
      '2024-best-productivity-tools': {
        id: '1',
        title: {
          zh: '2024年最佳生产力工具推荐',
          en: 'Best Productivity Tools of 2024'
        },
        content: {
          zh: `
            <h2>引言</h2>
            <p>在这个快节奏的数字时代，选择合适的生产力工具对于提升工作效率至关重要。本文将为你推荐2024年最值得使用的生产力工具。</p>
            
            <h2>顶级生产力工具</h2>
            <h3>1. Notion - 全能型工作空间</h3>
            <p>Notion是一个集笔记、数据库、项目管理于一体的强大工具。它允许用户创建自定义的工作流程，非常适合团队协作。</p>
            
            <h3>2. Todoist - 任务管理专家</h3>
            <p>Todoist提供了直观的任务管理界面，支持项目分类、标签系统和自然语言处理，让任务管理变得简单高效。</p>
            
            <h3>3. Slack - 团队沟通利器</h3>
            <p>Slack革命性地改变了团队沟通方式，通过频道组织、集成第三方应用等功能，大大提升了团队协作效率。</p>
            
            <h2>选择工具的建议</h2>
            <p>选择生产力工具时，需要考虑以下几个因素：</p>
            <ul>
              <li>团队规模和需求</li>
              <li>预算限制</li>
              <li>学习成本</li>
              <li>集成能力</li>
            </ul>
            
            <h2>结论</h2>
            <p>合适的生产力工具能够显著提升工作效率。建议根据自己的具体需求选择最适合的工具组合。</p>
          `,
          en: `
            <h2>Introduction</h2>
            <p>In this fast-paced digital era, choosing the right productivity tools is crucial for enhancing work efficiency. This article will recommend the most valuable productivity tools worth using in 2024.</p>
            
            <h2>Top Productivity Tools</h2>
            <h3>1. Notion - All-in-One Workspace</h3>
            <p>Notion is a powerful tool that combines note-taking, databases, and project management. It allows users to create custom workflows and is perfect for team collaboration.</p>
            
            <h3>2. Todoist - Task Management Expert</h3>
            <p>Todoist provides an intuitive task management interface with project categorization, tagging systems, and natural language processing, making task management simple and efficient.</p>
            
            <h3>3. Slack - Team Communication Tool</h3>
            <p>Slack has revolutionized team communication through channel organization, third-party app integrations, and other features that greatly enhance team collaboration efficiency.</p>
            
            <h2>Tool Selection Recommendations</h2>
            <p>When choosing productivity tools, consider the following factors:</p>
            <ul>
              <li>Team size and requirements</li>
              <li>Budget constraints</li>
              <li>Learning curve</li>
              <li>Integration capabilities</li>
            </ul>
            
            <h2>Conclusion</h2>
            <p>The right productivity tools can significantly boost work efficiency. It's recommended to choose the most suitable tool combination based on your specific needs.</p>
          `
        },
        author: 'Admin',
        publishedAt: '2024-01-15',
        tags: i18n.language === 'zh' ? ['生产力', '工具', '效率'] : ['Productivity', 'Tools', 'Efficiency'],
        slug: '2024-best-productivity-tools'
      }
    };

    const mockRelatedPosts: BlogPost[] = [
      {
        id: '2',
        title: {
          zh: 'AI工具如何改变我们的工作方式',
          en: 'How AI Tools Are Changing Our Work Methods'
        },
        content: { zh: '', en: '' },
        author: 'Editor',
        publishedAt: '2024-01-10',
        tags: i18n.language === 'zh' ? ['AI', '工作流程'] : ['AI', 'Workflow'],
        slug: 'ai-tools-changing-work'
      }
    ];

    setTimeout(() => {
      setPost(mockPosts[slug || ''] || null);
      setRelatedPosts(mockRelatedPosts);
      setLoading(false);
    }, 1000);
  }, [slug, i18n.language]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {i18n.language === 'zh' ? '文章未找到' : 'Article not found'}
          </h1>
          <Link to="/blog">
            <Button>{t('blog.backToBlog')}</Button>
          </Link>
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

      <article className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Back to Blog */}
        <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('blog.backToBlog')}
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {post.title[i18n.language as 'zh' | 'en']}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {t('blog.publishedOn')} {post.publishedAt}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>

          {/* Share Button */}
          <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
            <span className="text-sm font-medium text-gray-700">{t('blog.share')}:</span>
            <ShareButton
              title={post.title[i18n.language as 'zh' | 'en']}
              text={post.title[i18n.language as 'zh' | 'en']}
              url={window.location.href}
            />
          </div>
        </header>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none mb-16"
          dangerouslySetInnerHTML={{ __html: post.content[i18n.language as 'zh' | 'en'] }}
        />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('blog.relatedPosts')}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <h3 className="text-xl font-bold text-gray-900">
                      <Link to={`/blog/${relatedPost.slug}`} className="hover:text-blue-600">
                        {relatedPost.title[i18n.language as 'zh' | 'en']}
                      </Link>
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {relatedPost.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {relatedPost.publishedAt}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {relatedPost.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
