import { useContext } from "react";
import { AppMonthlyLimitContext } from "./app-monthly-limit-context";
import { Input } from "./ui/input";

export default function SettingsLimit() {
  const { monthlyLimit, setMonthlyLimit } = useContext(AppMonthlyLimitContext);
  return <div className="flex gap-2 items-center mt-2">
    <label htmlFor="limit" className="text-muted-foreground mr-4">限制</label>
    <Input 
      id="limit" 
      type="number" 
      className="w-fit" 
      value={monthlyLimit} 
      onChange={(e) => setMonthlyLimit(Number(e.target.value))} 
    />
  </div>
}

