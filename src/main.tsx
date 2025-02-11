import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HashRouter, Route, Routes } from "react-router";
import App from './App.tsx'
import { RecordsProviders } from './components/records-providers.tsx';
import React from 'react';

// 使用 React.lazy 动态导入组件
const CategoryDetail = React.lazy(() => import('./components/category-detail.tsx'));
const Past12MonthChart = React.lazy(() => import('./components/past-12-month-chart.tsx'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecordsProviders>
      <HashRouter>
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/:category" element={<CategoryDetail />} />
            <Route path="chart" element={<Past12MonthChart />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </RecordsProviders>
  </StrictMode>,
)

