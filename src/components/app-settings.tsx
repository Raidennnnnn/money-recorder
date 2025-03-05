import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { SelectedDayContext, SetSelectedDayContext } from "./app-records-contexts";
import { useContext } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { flushSync } from "react-dom";
import BackHomeButton from "./back-home-button";

export default function AppSettings() {
  const { theme, setTheme } = useTheme();
  const selectedDay = useContext(SelectedDayContext);
  const setSelectedDay = useContext(SetSelectedDayContext);

  return <div className="p-4 flex flex-col gap-4">
    <h1 className="font-bold text-2xl">设置</h1>
    <label htmlFor="day">选择记账周期起始日</label>
    <Select defaultValue={selectedDay} onValueChange={handleStartDayChange}>
      <SelectTrigger>
        <SelectValue placeholder="日期" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Array.from({ length: 28 }, (_, i) => i + 1).map(day => (
            <SelectItem key={day} value={day.toString()}>{day}日</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    <div className="flex items-center">
      <label htmlFor="day-type" className="mr-4">主题</label>
      <RadioGroup defaultValue={theme} onValueChange={handleThemeChange} className="flex p-1 rounded-lg w-fit border border-input">
        <div className="flex items-center">
          <RadioGroupItem value="light" id="light" className="peer sr-only" />
          <Label htmlFor="light" className="px-2.5 py-2 rounded-md peer-data-[state=checked]:bg-accent cursor-pointer">
            <Sun className="w-4 h-4" />
          </Label>
        </div>
        <div className="flex items-center">
          <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
          <Label htmlFor="dark" className="px-2 py-2 rounded-md peer-data-[state=checked]:bg-accent cursor-pointer">
            <Moon className="w-4 h-4" />
          </Label>
        </div>
        <div className="flex items-center">
          <RadioGroupItem value="system" id="system" className="peer sr-only" />
          <Label htmlFor="system" className="px-2 py-2 rounded-md peer-data-[state=checked]:bg-accent cursor-pointer">
            <Monitor className="w-4 h-4" />
          </Label>
        </div>
      </RadioGroup>
    </div>
    <BackHomeButton />
  </div>;

  function handleStartDayChange(value: string) {
    setSelectedDay(value);
    localStorage.setItem("selected-day", value);
  }

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