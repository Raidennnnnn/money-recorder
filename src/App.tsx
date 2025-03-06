import './App.css'
import { HashRouter, Routes, Route } from 'react-router';
import AppLayout from './components/app-layout';
import { AppRecordsProviders } from './components/app-records-providers';
import ThemeProviderV2 from './components/app-theme-provider';
import MoneyRecorder from './components/money-recorder';
import NotFoundPage from './components/not-found-page';
import AppInputLayoutProvider from './components/app-input-layout-provider.tsx';
import AppStatistic from './components/app-statistic.tsx';

export default function App() {
  return <AppRecordsProviders>
    <ThemeProviderV2 defaultTheme="system" storageKey="vite-ui-theme">
      <AppInputLayoutProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<MoneyRecorder />} />
              <Route path="statistic" element={<AppStatistic />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </HashRouter> 
      </AppInputLayoutProvider>
    </ThemeProviderV2>
  </AppRecordsProviders>;
}
