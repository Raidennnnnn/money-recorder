import { Category } from "@/types";
import FluentEmojiChopsticks from "./icon/fluent-emoji-chopsticks";
import FluentEmojiVideoGame from "./icon/fluent-emoji-video-game";
import FluentEmojiWomansClothes from "./icon/fluent-emoji-womans-clothes";
import { Button } from "./ui/button";
import { useContext, useRef, useState } from "react";
import CountUp from "react-countup";
import { CurrentCycleRecordsContext, TotalConfirmedContext, UnconfirmedRecordsContext } from "./app-records-contexts";
import FluentEmojiSportUtilityVehicle from "./icon/fluent-emoji-sport-utility-vehicle";
import FluentEmojiFaceWithThermometer from "./icon/fluent-emoji-face-with-thermometer";
import FluentEmojiSoap from "./icon/fluent-emoji-soap";
import FluentEmojiMoneyWithWings from "./icon/fluent-emoji-money-with-wings";
import { ArrowUpRightIcon, ChevronsLeftRightEllipsisIcon, EqualIcon } from "lucide-react";
import { useNavigateWithTransition } from "../hooks/use-navi-with-transition";

const ICON: Record<Category, React.ReactNode> = {
  [Category.CLOTH]: <FluentEmojiWomansClothes className="w-11! h-11!" />,
  [Category.EAT]: <FluentEmojiChopsticks className="w-11! h-11!" />,
  [Category.ENTERTAINMENT]: <FluentEmojiVideoGame className="w-11! h-11!" />,
  [Category.TRANSPORTATION]: <FluentEmojiSportUtilityVehicle className="w-11! h-11!" />,
  [Category.HEALTH]: <FluentEmojiFaceWithThermometer className="w-11! h-11!" />,
  [Category.DAILY]: <FluentEmojiSoap className="w-11! h-11!" />,
  [Category.OTHER]: <FluentEmojiMoneyWithWings className="w-11! h-11!" />,
}

const BACKGROUND_COLORS: Record<Category, string> = {
  [Category.CLOTH]: "bg-pink-200 dark:bg-pink-800/80",
  [Category.EAT]:"bg-rose-200 dark:bg-rose-800/80",
  [Category.ENTERTAINMENT]: "bg-violet-200 dark:bg-violet-800/80",
  [Category.TRANSPORTATION]: "bg-blue-200 dark:bg-blue-800/80",
  [Category.HEALTH]: "bg-yellow-200 dark:bg-yellow-800/80",
  [Category.DAILY]: "bg-fuchsia-200 dark:bg-fuchsia-800/80",
  [Category.OTHER]: "bg-green-200 dark:bg-green-800/80",
}

interface MoneyRecorderButtonProps {
  category: Category;
  onClick: (category: Category) => void;
  onLongPress: (category: Category, amount: number) => void;
}

export default function MoneyRecorderButton({
  category,
  onClick,
  onLongPress,
}: MoneyRecorderButtonProps) {
  const navigate = useNavigateWithTransition();
  const records = useContext(CurrentCycleRecordsContext);
  const totalConfirmed = useContext(TotalConfirmedContext);
  const unconfirmedRecords = useContext(UnconfirmedRecordsContext);

  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [isPressing, setIsPressing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const confirmedInThisCycle = records.filter(c => c.category === category);

  const confirmedTotal = confirmedInThisCycle.reduce((acc, curr) => acc + (curr.removed ? 0 : curr.amount), 0)
  const ratio = confirmedTotal === 0 ? 0 : (confirmedTotal / totalConfirmed);

  return (
    <Button
      variant="outline"
      className={`relative justify-start h-fit w-full p-2.5 overflow-hidden select-none`}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
    >
      <div
        className={`absolute inset-0 ${BACKGROUND_COLORS[category]} transition-width duration-500 ease-in-out`}
        style={{ width: `${ratio * 100}%` }}
      ></div>
      <div className="relative z-20 flex items-end gap-2">
        {ICON[category]}
        <div className="text-3xl leading-9 font-bold flex items-end gap-2" >
          <CountUp end={confirmedTotal} duration={1} />
          <div ref={ref} className="bg-secondary/50 rounded no-click p-[2px] h-fit w-fit" onClick={() => navigate(`/detail/${category}`, ref)}>
            <ChevronsLeftRightEllipsisIcon className="w-5! h-5! text-muted-foreground" />
          </div>
        </div>
        {unconfirmedRecords?.category === category && (
          <div className="font-bold text-red-600 leading-4">
            <div className="flex">
              <ArrowUpRightIcon className="w-4! h-4!" />
              <CountUp end={Number(unconfirmedRecords.amount)} duration={0.5} />
            </div>
            <div className="flex">
              <EqualIcon className="w-4! h-4!" />
              <CountUp end={confirmedTotal + Number(unconfirmedRecords.amount)} duration={0.5} />
            </div>
          </div>
        )}
      </div>
      {isPressing && (
        <div className="absolute bottom-0 left-0 h-1 bg-destructive animate-grow"></div>
      )}
    </Button>
  );
  
  function handlePressStart(e: React.TouchEvent<HTMLButtonElement>) {
    if ((e.target as HTMLElement).closest('.no-click')) {
      return;
    }

    if (!unconfirmedRecords) {
      onClick(category);
      return;
    }

    setIsPressing(true);

    const timer = setTimeout(() => {
      onLongPress(category, Number(unconfirmedRecords.amount));
      setIsPressing(false);
    }, 500); // 长按时间阈值（毫秒）
    setPressTimer(timer);
  };

  function handlePressEnd() {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
      setIsPressing(false);
    }
  };
}
