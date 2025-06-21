
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';

const AdminSEO = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">SEO优化</h2>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>SEO设置</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">SEO优化功能正在开发中...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSEO;
