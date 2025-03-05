import { SettingsIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "../components/ui/drawer";
import AppSettingsStartDay from "./app-settings-start-day";
import AppSettingsTheme from "./app-settings-theme";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function AppSettings() {
  return <Drawer>
    <DrawerTrigger asChild>
      <Button variant="outline" size="sm" className="px-2">
        <SettingsIcon className="w-4 h-4" />
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <VisuallyHidden>
        <DrawerHeader>
          <DrawerTitle>设置</DrawerTitle>
        </DrawerHeader>
        <DrawerDescription>
          设置应用的开始日期和主题
        </DrawerDescription>
      </VisuallyHidden>
      <div className="my-8 mx-4">
        <AppSettingsStartDay />
        <AppSettingsTheme />
      </div>

    </DrawerContent>
  </Drawer>
}
