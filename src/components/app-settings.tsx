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
import AppSettingsInputLayout from "./app-settings-input-layout";

export default function AppSettings() {
  return <Drawer>
    <DrawerTrigger asChild>
      <Button type="button" title="设置" variant="outline" size="sm" className="px-2">
        <SettingsIcon className="w-4 h-4" />
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <VisuallyHidden>
        <DrawerHeader>
          <DrawerTitle>设置</DrawerTitle>
        </DrawerHeader>
        <DrawerDescription>
          设置应用的开始日期、主题和输入框位置
        </DrawerDescription>
      </VisuallyHidden>
      <div className="mt-4 mb-8 mx-4">
        <AppSettingsStartDay />
        <AppSettingsTheme />
        <AppSettingsInputLayout />
      </div>
    </DrawerContent>
  </Drawer>
}
