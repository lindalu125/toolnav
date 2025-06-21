
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileJson } from 'lucide-react';
import type { ImportTask } from '@/types/ads';

export const ImportTools = () => {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [importTask, setImportTask] = useState<ImportTask | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/json') {
      setFile(selectedFile);
    } else {
      toast({
        title: "错误",
        description: "请选择JSON文件",
        variant: "destructive"
      });
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    try {
      const content = await file.text();
      const tools = JSON.parse(content);

      if (!Array.isArray(tools)) {
        throw new Error('JSON文件必须包含工具数组');
      }

      // 创建导入任务
      const { data: task, error: taskError } = await supabase
        .from('import_tasks')
        .insert([{
          filename: file.name,
          total_count: tools.length,
          status: 'processing'
        }])
        .select()
        .single();

      if (taskError) throw taskError;
      setImportTask(task);

      // 开始导入
      let successCount = 0;
      let errorCount = 0;
      const errors: any[] = [];

      for (let i = 0; i < tools.length; i++) {
        const tool = tools[i];
        try {
          // 验证必需字段
          if (!tool.name || !tool.url) {
            throw new Error('缺少必需字段: name 或 url');
          }

          // 插入工具
          const { error: insertError } = await supabase
            .from('user_tools')
            .insert([{
              name: tool.name,
              description: tool.description || '',
              url: tool.url,
              user_id: 1, // 默认用户ID，你可能需要调整
              status: 'approved', // 直接批准导入的工具
              locale: tool.locale || 'zh'
            }]);

          if (insertError) throw insertError;
          successCount++;
        } catch (error) {
          errorCount++;
          errors.push({
            index: i,
            tool: tool,
            error: error instanceof Error ? error.message : String(error)
          });
          console.error(`Error importing tool at index ${i}:`, error);
        }

        // 更新进度
        const progress = ((i + 1) / tools.length) * 100;
        setImportTask(prev => prev ? {
          ...prev,
          success_count: successCount,
          error_count: errorCount
        } : null);
      }

      // 完成导入任务
      await supabase
        .from('import_tasks')
        .update({
          status: 'completed',
          success_count: successCount,
          error_count: errorCount,
          errors: errors,
          completed_at: new Date().toISOString()
        })
        .eq('id', task.id);

      toast({
        title: "导入完成",
        description: `成功导入 ${successCount} 个工具，失败 ${errorCount} 个`
      });

    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: "导入失败",
        description: error instanceof Error ? error.message : "未知错误",
        variant: "destructive"
      });

      if (importTask) {
        await supabase
          .from('import_tasks')
          .update({
            status: 'failed',
            error_count: 1,
            errors: [{ error: error instanceof Error ? error.message : String(error) }],
            completed_at: new Date().toISOString()
          })
          .eq('id', importTask.id);
      }
    } finally {
      setImporting(false);
    }
  };

  const progress = importTask ? 
    ((importTask.success_count + importTask.error_count) / importTask.total_count) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileJson className="h-5 w-5" />
          <span>批量导入工具</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="jsonFile">选择JSON文件</Label>
          <Input
            id="jsonFile"
            type="file"
            accept=".json"
            onChange={handleFileChange}
            disabled={importing}
          />
          <p className="text-sm text-gray-500 mt-1">
            JSON格式示例: [{"name": "工具名称", "url": "https://example.com", "description": "描述"}]
          </p>
        </div>

        {file && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm">
              <strong>文件:</strong> {file.name} ({(file.size / 1024).toFixed(1)} KB)
            </p>
          </div>
        )}

        {importTask && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>导入进度</span>
              <span>{importTask.success_count + importTask.error_count} / {importTask.total_count}</span>
            </div>
            <Progress value={progress} className="w-full" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>成功: {importTask.success_count}</span>
              <span>失败: {importTask.error_count}</span>
            </div>
          </div>
        )}

        <Button 
          onClick={handleImport} 
          disabled={!file || importing}
          className="w-full"
        >
          <Upload className="h-4 w-4 mr-2" />
          {importing ? '导入中...' : '开始导入'}
        </Button>
      </CardContent>
    </Card>
  );
};
