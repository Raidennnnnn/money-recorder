import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HashRouter, Route, Routes } from "react-router";
import App from './App.tsx'
import CategoryDetail from './components/category-detail.tsx';
import { RecordsProviders } from './components/records-providers.tsx';
import Past12MonthChart from './components/past-12-month-chart.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecordsProviders>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:category" element={<CategoryDetail />} />
          <Route path="chart" element={<Past12MonthChart />} />
        </Routes>
      </HashRouter>
    </RecordsProviders>
  </StrictMode>,
)

