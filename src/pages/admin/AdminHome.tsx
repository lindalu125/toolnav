
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Settings, 
  BarChart3, 
  FileText, 
  Search,
  Wrench,
  Tags,
  Globe,
  Mail,
  Webhook,
  Upload,
  Ad
} from 'lucide-react';

export const AdminHome = () => {
  const adminSections = [
    {
      title: "用户管理",
      description: "管理用户账户和权限",
      icon: Users,
      path: "/admin/users",
      color: "bg-blue-500"
    },
    {
      title: "工具管理",
      description: "审核和管理提交的工具",
      icon: Wrench,
      path: "/admin/tools",
      color: "bg-green-500"
    },
    {
      title: "分类管理",
      description: "管理工具分类",
      icon: Tags,
      path: "/admin/categories",
      color: "bg-purple-500"
    },
    {
      title: "内容管理",
      description: "管理文章和页面内容",
      icon: FileText,
      path: "/admin/content",
      color: "bg-orange-500"
    },
    {
      title: "数据统计",
      description: "查看网站使用统计",
      icon: BarChart3,
      path: "/admin/analytics",
      color: "bg-red-500"
    },
    {
      title: "SEO优化",
      description: "管理SEO设置和元数据",
      icon: Search,
      path: "/admin/seo",
      color: "bg-indigo-500"
    },
    {
      title: "集成管理",
      description: "广告、邮件、工具抓取和API集成",
      icon: Globe,
      path: "/admin/integrations",
      color: "bg-teal-500"
    },
    {
      title: "系统设置",
      description: "网站基本设置和配置",
      icon: Settings,
      path: "/admin/settings",
      color: "bg-gray-500"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">管理后台</h1>
        <p className="text-gray-600 mt-2">
          欢迎来到AI工具导航网站管理后台
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminSections.map((section) => {
          const IconComponent = section.icon;
          return (
            <Card key={section.path} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${section.color} text-white`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{section.description}</p>
                <Link to={section.path}>
                  <Button className="w-full">
                    进入管理
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>快速操作</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link to="/admin/integrations">
              <Button variant="outline" className="w-full">
                <Ad className="h-4 w-4 mr-2" />
                广告管理
              </Button>
            </Link>
            <Link to="/admin/integrations">
              <Button variant="outline" className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                批量导入
              </Button>
            </Link>
            <Link to="/admin/integrations">
              <Button variant="outline" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                邮件订阅
              </Button>
            </Link>
            <Link to="/admin/integrations">
              <Button variant="outline" className="w-full">
                <Webhook className="h-4 w-4 mr-2" />
                API集成
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
