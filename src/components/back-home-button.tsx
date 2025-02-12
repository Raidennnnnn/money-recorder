import { HomeIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigateWithTransition } from "../hooks/use-navi-with-transition";

export default function BackHomeButton() {
  const navigate = useNavigateWithTransition  ();
  return <Button
    variant="outline"
    size="sm"
    className="px-2"
    onClick={() => navigate('/')}
  >
    <HomeIcon className="w-4 h-4" />
  </Button>
}