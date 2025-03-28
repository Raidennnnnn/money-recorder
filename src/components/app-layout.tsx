import { Outlet, useLocation } from "react-router";
import AppSettings from "./settings";
import { useNavigateWithTransition } from "@/hooks/use-navi-with-transition";
import { Button } from "./ui/button";
import { ChartColumn, Home } from "lucide-react";

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigateWithTransition();

  const isHomePage = location.pathname === '/';
  
  return <div className="h-full">
    <Outlet />
    <div className="fixed bottom-7 right-4 flex gap-2 float-button-container">
      <AppSettings />
      <Button 
        size="sm" 
        type="button" 
        variant="outline" 
        className="px-2 navigation-button" 
        title={isHomePage ? '统计' : '首页'} 
        onClick={() => navigate(isHomePage ? '/statistic' : '/')}
      >
        { isHomePage ? <ChartColumn className="w-4 h-4" /> : <Home className="w-4 h-4" /> }
      </Button>
    </div>
  </div>;
}

