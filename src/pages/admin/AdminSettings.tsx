
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">系统设置</h2>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>基本设置</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">系统设置功能正在开发中...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
