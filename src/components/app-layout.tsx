import { Outlet, useLocation } from "react-router";
import AppSettings from "./app-settings";
import { useNavigateWithTransition } from "@/hooks/use-navi-with-transition";
import { Button } from "./ui/button";
import { ChartColumn, Home } from "lucide-react";

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigateWithTransition();

  const isHomePage = location.pathname === '/';
  
  return <div>
    <Outlet />
    <div className="fixed bottom-6 right-4 flex gap-2 float-button-container">
      <AppSettings />
      <Button variant="outline" size="sm" className="px-2 navigation-button" onClick={() => navigate(isHomePage ? '/statistic' : '/')}>
        { isHomePage ? <ChartColumn className="w-4 h-4" /> : <Home className="w-4 h-4" /> }
      </Button>
    </div>
  </div>;
}

