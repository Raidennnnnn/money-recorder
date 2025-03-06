import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItemButton } from "./ui/radio-group";
import { ArrowUpToLine, ArrowDownToLine } from "lucide-react";
import { useContext } from "react";
import { AppInputLayoutContext } from "./app-input-layout-context";
// import { flushSync } from "react-dom";

const INPUT_LAYOUT_ICON_MAP = {
  up: <ArrowUpToLine className="w-4 h-4" />,
  down: <ArrowDownToLine className="w-4 h-4" />,
}

export default function AppSettingsInputLayout() {
  const { inputLayout, setInputLayout } = useContext(AppInputLayoutContext);

  return <div className="flex items-center mt-2">
    <label htmlFor="day-type" className="mr-4 text-muted-foreground">输入框位置</label>
    <RadioGroup defaultValue={inputLayout} onValueChange={setInputLayout} className="flex p-1 rounded-lg w-fit gap-2">
      {
        Object
          .entries(INPUT_LAYOUT_ICON_MAP)
          .map(([inputLayout, icon]) => <RadioGroupItemButton key={inputLayout} value={inputLayout} id={inputLayout}>{icon}</RadioGroupItemButton>)
      }
    </RadioGroup>
  </div>;
}