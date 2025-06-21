
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

const AdminAnalytics = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">数据统计</h2>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>访问统计</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">数据统计功能正在开发中...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
