import MoneyRecorder from './components/money-recorder'
import './App.css'
import { useNavigateWithTransition } from './hooks/use-navi-with-transition';
import { Button } from './components/ui/button';
import { ChartColumnIcon, Printer } from 'lucide-react';
import ThemeToggle from './components/app-theme-toggle';
import { useContext, useRef } from 'react';
import { Past12MonthRecordsContext } from './components/record-context';

export default function App() {
  const navigate = useNavigateWithTransition();
  const ref = useRef<HTMLButtonElement>(null);
  const allRecords = useContext(Past12MonthRecordsContext);

  function handleExportRecords() {
    try {
      // 将记录转换为JSON字符串
      const recordsJson = JSON.stringify(allRecords, null, 2);
      
      // 创建Blob对象
      const blob = new Blob([recordsJson], { type: 'application/json' });
      
      // 创建下载链接
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // 设置文件名（使用当前日期）
      const date = new Date();
      const fileName = `records_export_${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}.json`;
      link.download = fileName;
      
      // 触发下载
      document.body.appendChild(link);
      link.click();
      
      // 清理
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert('导出成功！');
    } catch (error) {
      console.error('导出失败:', error);
      alert('导出失败，请查看控制台获取详细信息。');
    }
  }

  return <>
    <div className="app-container">
      <MoneyRecorder />
      <div className="fixed bottom-8 right-4 flex gap-2">
        <Button onClick={handleExportRecords} variant="outline" size="sm" className="px-2">
          <Printer className="w-4 h-4" />
        </Button>
        <ThemeToggle />
        <Button ref={ref} variant="outline" size="sm" className="px-2" onClick={() => navigate('/chart', ref)}>
          <ChartColumnIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  </>
}
