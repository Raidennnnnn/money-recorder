import { SettingsIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
} from "../components/ui/drawer";
import AppSettingsStartDay from "./app-settings-start-day";
import AppSettingsTheme from "./app-settings-theme";

export default function AppSettings() {
  return <Drawer>
    <DrawerTrigger asChild>
      <Button variant="outline" size="sm" className="px-2">
        <SettingsIcon className="w-4 h-4" />
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <div className="my-8 mx-4">
        <AppSettingsStartDay />
        <AppSettingsTheme />
      </div>
    </DrawerContent>
  </Drawer>
}
