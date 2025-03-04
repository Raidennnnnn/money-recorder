import { SettingsIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigateWithTransition } from "../hooks/use-navi-with-transition";
import { useRef } from "react";

export default function AppSettingsInvokeButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const navigate = useNavigateWithTransition();
  return <Button ref={ref} variant="outline" size="sm" className="px-2" onClick={() => navigate('/settings', ref)}>
    <SettingsIcon className="w-4 h-4" />
  </Button>
}

