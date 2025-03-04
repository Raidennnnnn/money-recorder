import './App.css'
import { useNavigateWithTransition } from './hooks/use-navi-with-transition';
import { Button } from './components/ui/button';
import { ChartColumnIcon } from 'lucide-react';
import { useRef } from 'react';
import AppSettingsInvokeButton from './components/app-settings-invoke-button';
import MoneyRecorderV2 from './components/money-recorder-v2';
export default function App() {
  const navigate = useNavigateWithTransition();
  const ref = useRef<HTMLButtonElement>(null);
  return <>
    <MoneyRecorderV2 />
    <div className="fixed bottom-8 right-4 flex gap-2">
      <Button ref={ref} variant="outline" size="sm" className="px-2" onClick={() => navigate('/statistic', ref)}>
        <ChartColumnIcon className="w-4 h-4" />
      </Button>
      <AppSettingsInvokeButton />
    </div>
  </>
}
