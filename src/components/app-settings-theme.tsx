import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItemButton } from "./ui/radio-group";
import { useTheme } from "@/hooks/use-theme";
import { flushSync } from "react-dom";
import { Sun, Moon, Monitor } from "lucide-react";

const THEME_ICON_MAP = {
  light: <Sun className="w-4 h-4" />,
  dark: <Moon className="w-4 h-4" />,
  system: <Monitor className="w-4 h-4" />
}


export default function AppSettingsTheme() {
  const { theme, setTheme } = useTheme();

  return <div className="flex items-center mt-2">
    <label htmlFor="day-type" className="mr-4 text-muted-foreground">主题</label>
    <RadioGroup defaultValue={theme} onValueChange={handleThemeChange} className="flex p-1 rounded-lg w-fit gap-2">
      {
        Object
          .entries(THEME_ICON_MAP)
          .map(([theme, icon]) => <RadioGroupItemButton key={theme} value={theme} id={theme}>{icon}</RadioGroupItemButton>)
      }
    </RadioGroup>
  </div>;

  function handleThemeChange(value: string) {
    if (
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setTheme(value as 'light' | 'dark' | 'system')
      return
    }
    document.startViewTransition(() => {
      flushSync(() => {
        setTheme(value as 'light' | 'dark' | 'system')
      })
    })
  }
}


