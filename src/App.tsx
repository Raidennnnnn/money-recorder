import './App.css'
import { Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router';
import AppLayout from './components/app-layout';
import { AppRecordsProviders } from './components/app-records-providers';
import ThemeProviderV2 from './components/app-theme-provider';
import MoneyRecorder from './components/money-recorder';
import NotFoundPage from './components/not-found-page';
import React from 'react';

const AppStatistic = React.lazy(() => import('./components/app-statistic.tsx'));

export default function App() {
  return <AppRecordsProviders>
    <ThemeProviderV2 defaultTheme="system" storageKey="vite-ui-theme">
      <HashRouter>
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<MoneyRecorder />} />
              <Route path="statistic" element={<AppStatistic />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
    </ThemeProviderV2>
  </AppRecordsProviders>;
}
