
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tags } from 'lucide-react';

const AdminCategories = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">分类管理</h2>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Tags className="h-5 w-5" />
            <span>工具分类</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">分类管理功能正在开发中...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCategories;
