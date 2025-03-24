import './App.css'
import { HashRouter, Routes, Route } from 'react-router';
import AppLayout from './components/app-layout';
import { AppRecordsProviders } from './components/app-records-providers';
import ThemeProvider from './components/app-theme-provider';
import MoneyRecorder from './components/money-recorder';
import NotFoundPage from './components/not-found-page';
import AppInputLayoutProvider from './components/app-input-layout-provider.tsx';
import Statistic from './components/statistic.tsx';
import AppMonthlyLimitProvider from './components/app-monthly-limit-provider.tsx';

export default function App() {
  return <AppRecordsProviders>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AppMonthlyLimitProvider>
        <AppInputLayoutProvider>
          <HashRouter>
              <Routes>
                <Route path="/" element={<AppLayout />}>
                <Route index element={<MoneyRecorder />} />
                <Route path="statistic" element={<Statistic />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </HashRouter> 
        </AppInputLayoutProvider>
      </AppMonthlyLimitProvider>
    </ThemeProvider>
  </AppRecordsProviders>;
}
