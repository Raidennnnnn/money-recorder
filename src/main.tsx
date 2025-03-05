import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from "react-router";
import App from './App.tsx'
import React from 'react';
import NotFoundPage from './components/not-found-page.tsx';
import ThemeProviderV2 from './components/app-theme-provider-v2.tsx';
import { AppRecordsProviders } from './components/app-records-providers.tsx';

import './index.css'
import './view-transition.css'

// 使用 React.lazy 动态导入组件
const AppStatistic = React.lazy(() => import('./components/app-statistic.tsx'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRecordsProviders>
      <ThemeProviderV2 defaultTheme="system" storageKey="vite-ui-theme">
        <HashRouter>
          <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="statistic" element={<AppStatistic />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </HashRouter>
      </ThemeProviderV2>
    </AppRecordsProviders>
  </StrictMode>,
)

