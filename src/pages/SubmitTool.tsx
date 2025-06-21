
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useToast } from '@/hooks/use-toast';

export default function SubmitTool() {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    category: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = i18n.language === 'zh' 
    ? ['生产力', '设计', '开发', '营销', '分析', '通讯', 'AI工具', '写作', '项目管理', '其他']
    : ['Productivity', 'Design', 'Development', 'Marketing', 'Analytics', 'Communication', 'AI Tools', 'Writing', 'Project Management', 'Other'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 模拟提交逻辑
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: t('submit.success'),
        description: i18n.language === 'zh' ? '我们会尽快审核您提交的工具' : 'We will review your submitted tool as soon as possible',
      });

      setFormData({ name: '', url: '', category: '', description: '' });
    } catch (error) {
      toast({
        title: t('submit.error'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <Link to="/blog" className="text-gray-600 hover:text-gray-900">
                {t('nav.blog')}
              </Link>
              <span className="text-gray-900 font-medium">{t('nav.submit')}</span>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('submit.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('submit.description')}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {i18n.language === 'zh' ? '工具信息' : 'Tool Information'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('submit.name')} *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={i18n.language === 'zh' ? '请输入工具名称' : 'Enter tool name'}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('submit.url')} *
                </label>
                <Input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('submit.category')} *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setFormData({ ...formData, category })}
                      className={`p-2 text-sm rounded-lg border transition-colors ${
                        formData.category === category
                          ? 'bg-blue-50 border-blue-300 text-blue-700'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {i18n.language === 'zh' ? '工具描述' : 'Tool Description'}
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={i18n.language === 'zh' ? '简单描述这个工具的功能和特点' : 'Briefly describe the features and characteristics of this tool'}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting || !formData.name || !formData.url || !formData.category}
              >
                {isSubmitting 
                  ? (i18n.language === 'zh' ? '提交中...' : 'Submitting...') 
                  : t('submit.submit')
                }
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
