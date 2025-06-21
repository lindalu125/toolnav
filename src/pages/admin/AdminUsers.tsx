
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const AdminUsers = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">用户管理</h2>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>用户列表</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">用户管理功能正在开发中...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
