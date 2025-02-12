import { HomeIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigateWithTransition } from "./use-navi-with-transition";

export default function BackHomeButton() {
  const navigate = useNavigateWithTransition  ();
  return <Button
    variant="outline"
    className="fixed bottom-8 right-4 px-2.5"
    onClick={() => navigate('/')}
  >
    <HomeIcon className="w-4 h-4" />
  </Button>
}