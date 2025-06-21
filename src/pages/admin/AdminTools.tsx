
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench } from 'lucide-react';

const AdminTools = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">工具管理</h2>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wrench className="h-5 w-5" />
            <span>工具审核</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">工具管理功能正在开发中...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTools;
