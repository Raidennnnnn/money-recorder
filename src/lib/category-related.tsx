import FluentEmojiSportUtilityVehicle from "@/components/icon/fluent-emoji-sport-utility-vehicle";
import FluentEmojiFaceWithThermometer from "@/components/icon/fluent-emoji-face-with-thermometer";
import FluentEmojiSoap from "@/components/icon/fluent-emoji-soap";
import FluentEmojiMoneyWithWings from "@/components/icon/fluent-emoji-money-with-wings";
import FluentEmojiChopsticks from "@/components/icon/fluent-emoji-chopsticks";
import FluentEmojiVideoGame from "@/components/icon/fluent-emoji-video-game";
import FluentEmojiWomansClothes from "@/components/icon/fluent-emoji-womans-clothes";
import { Category } from "@/types";

export const CATEGORY_NAME = {
  [Category.EAT]: "餐饮",
  [Category.TRANSPORTATION]: "交通",
  [Category.ENTERTAINMENT]: "娱乐",
  [Category.HEALTH]: "健康",
  [Category.DAILY]: "日用品",
  [Category.CLOTH]: "服饰",
  [Category.OTHER]: "其他"
} as const;


export const ICON: Record<Category, React.ReactNode> = {
  [Category.CLOTH]: <FluentEmojiWomansClothes className="w-10! h-10!" />,
  [Category.EAT]: <FluentEmojiChopsticks className="w-10! h-10!" />,
  [Category.ENTERTAINMENT]: <FluentEmojiVideoGame className="w-10! h-10!" />,
  [Category.TRANSPORTATION]: <FluentEmojiSportUtilityVehicle className="w-10! h-10!" />,
  [Category.HEALTH]: <FluentEmojiFaceWithThermometer className="w-10! h-10!" />,
  [Category.DAILY]: <FluentEmojiSoap className="w-10! h-10!" />,
  [Category.OTHER]: <FluentEmojiMoneyWithWings className="w-10! h-10!" />,
}

export const BACKGROUND_COLORS: Record<Category, string> = {
  [Category.CLOTH]: "bg-pink-200 dark:bg-pink-800/80",
  [Category.EAT]:"bg-rose-200 dark:bg-rose-800/80",
  [Category.ENTERTAINMENT]: "bg-violet-200 dark:bg-violet-800/80",
  [Category.TRANSPORTATION]: "bg-blue-200 dark:bg-blue-800/80",
  [Category.HEALTH]: "bg-yellow-200 dark:bg-yellow-800/80",
  [Category.DAILY]: "bg-fuchsia-200 dark:bg-fuchsia-800/80",
  [Category.OTHER]: "bg-green-200 dark:bg-green-800/80",
}