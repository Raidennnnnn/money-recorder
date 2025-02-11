import MoneyRecorder from './components/money-recorder'
import './App.css'
import { useNavigateWithTransition } from './components/use-navi-with-transition';
import { Button } from './components/ui/button';
import { ChartColumnIcon } from 'lucide-react';

export default function App() {
  const navigate = useNavigateWithTransition();
  return <>
    <MoneyRecorder />
    <Button variant="outline" className="fixed bottom-4 right-4 px-2.5" onClick={() => navigate('/chart')}>
      <ChartColumnIcon className="w-4 h-4" />
    </Button>
  </>
}
