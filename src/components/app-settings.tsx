import AppSubpageCornerButtons from "./app-subpage-corner-buttons";
import { Label } from "./ui/label";
import { RadioGroup } from "./ui/radio-group";
import { RadioGroupItem } from "./ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function AppSettings() {
  const selectedDay = localStorage.getItem('selected-day') || '1';

  return <div className="p-4 flex flex-col gap-4">
    <h1 className="font-bold text-2xl">设置</h1>
    <label htmlFor="day">选择每月：</label>
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
    <div className="flex items-center gap-2">
      <label htmlFor="day-type" className="mr-4">作为：</label>
      <RadioGroup defaultValue="start" onValueChange={handleDayTypeChange} className="flex p-1 rounded-lg w-fit border border-input">
        <div className="flex items-center">
        <RadioGroupItem value="start" id="start" className="peer sr-only" />
        <Label htmlFor="start" className="px-4 py-2 rounded-md peer-data-[state=checked]:bg-accent cursor-pointer">开始</Label>
      </div>
      <div className="flex items-center">
        <RadioGroupItem value="end" id="end" className="peer sr-only" />
        <Label htmlFor="end" className="px-4 py-2 rounded-md peer-data-[state=checked]:bg-accent cursor-pointer">结束</Label>
        </div>
      </RadioGroup>
    </div>
    <AppSubpageCornerButtons />
  </div>;

  function handleStartDayChange(value: string) {
    localStorage.setItem("selected-day", value);
  }

  function handleDayTypeChange(value: string) {
    localStorage.setItem("day-type", value);
  }
}


