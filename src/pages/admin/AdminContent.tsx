
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const AdminContent = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">内容管理</h2>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>文章管理</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">内容管理功能正在开发中...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminContent;
