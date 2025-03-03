import './App.css'
import { useNavigateWithTransition } from './hooks/use-navi-with-transition';
import { Button } from './components/ui/button';
import { ChartColumnIcon } from 'lucide-react';
import ThemeToggle from './components/app-theme-toggle';
import { useRef } from 'react';
import AppSettingsButton from './components/app-settings-button';
import MoneyRecorderV2 from './components/money-recorder-v2';
export default function App() {
  const navigate = useNavigateWithTransition();
  const ref = useRef<HTMLButtonElement>(null);
  return <>
    <MoneyRecorderV2 />
    <div className="fixed bottom-8 right-4 flex gap-2">
      <ThemeToggle />
      <Button ref={ref} variant="outline" size="sm" className="px-2" onClick={() => navigate('/chart', ref)}>
        <ChartColumnIcon className="w-4 h-4" />
      </Button>
      <AppSettingsButton />
    </div>
  </>
}
