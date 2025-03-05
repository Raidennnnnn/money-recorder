import { SelectedDayContext } from "./app-records-contexts";
import { useContext } from "react";
import { RadioGroup, RadioGroupItemButton } from "./ui/radio-group";
import { SetSelectedDayContext } from "./app-records-contexts";

export default function AppSettingsStartDay() {
  const selectedDay = useContext(SelectedDayContext);
  const setSelectedDay = useContext(SetSelectedDayContext);
  
  return <div>
    <label htmlFor="day" className="text-muted-foreground">选择记账周期起始日</label>
    <RadioGroup defaultValue={selectedDay} onValueChange={handleStartDayChange} className="grid grid-cols-7 mt-2">
      {
        Array
          .from({ length: 28 }, (_, i) => i + 1)
          .map(day => <RadioGroupItemButton key={day} value={day.toString()} id={day.toString()}>{day}</RadioGroupItemButton>)
      }
    </RadioGroup>
  </div>

  function handleStartDayChange(value: string) {
    setSelectedDay(value);
    localStorage.setItem("selected-day", value);
  }
}


