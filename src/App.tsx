import './App.css'
import { useNavigateWithTransition } from './hooks/use-navi-with-transition';
import { Button } from './components/ui/button';
import { ArrowDown } from 'lucide-react';
import MoneyRecorderV2 from './components/money-recorder';
import AppSettings from './components/app-settings';

export default function App() {
  const navigate = useNavigateWithTransition();

  return <>
    <MoneyRecorderV2 />
    <div className="fixed bottom-8 right-4 flex gap-2 float-button-container">
      <AppSettings />
      <Button variant="outline" size="sm" className="px-2" onClick={() => navigate('/statistic')}>
        <ArrowDown className="w-4 h-4" />
      </Button>
    </div>
  </>;
}
