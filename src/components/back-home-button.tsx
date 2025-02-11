import { HomeIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigateWithTransition } from "../hooks/use-navi-with-transition";
import { useRef } from "react";

export default function BackHomeButton() {
  const navigate = useNavigateWithTransition();
  const ref = useRef<HTMLButtonElement>(null);
  
  return <Button
    ref={ref}
    variant="outline"
    size="sm"
    className="px-2"
    onClick={() => navigate('/', ref)}
  >
    <HomeIcon className="w-4 h-4" />
  </Button>
}