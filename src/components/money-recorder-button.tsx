import { Category } from "@/types";
import FluentEmojiChopsticks from "./icon/fluent-emoji-chopsticks";
import FluentEmojiVideoGame from "./icon/fluent-emoji-video-game";
import FluentEmojiWomansClothes from "./icon/fluent-emoji-womans-clothes";
import { Button } from "./ui/button";
import { useContext, useState } from "react";
import CountUp from "react-countup";
import { RecordContext, TotalConfirmedContext } from "./record-context";
import FluentEmojiSportUtilityVehicle from "./icon/fluent-emoji-sport-utility-vehicle";
import FluentEmojiFaceWithThermometer from "./icon/fluent-emoji-face-with-thermometer";
import FluentEmojiSoap from "./icon/fluent-emoji-soap";
import FluentEmojiMoneyWithWings from "./icon/fluent-emoji-money-with-wings";
import { ArrowUpRightIcon, ChevronsLeftRightEllipsisIcon, EqualIcon } from "lucide-react";
import { useNavigateWithTransition } from "./use-navi-with-transition";

const ICON: Record<Category, React.ReactNode> = {
  [Category.CLOTH]: <FluentEmojiWomansClothes className="!w-12 !h-12" />,
  [Category.EAT]: <FluentEmojiChopsticks className="!w-12 !h-12" />,
  [Category.ENTERTAINMENT]: <FluentEmojiVideoGame className="!w-12 !h-12" />,
  [Category.TRANSPORTATION]: <FluentEmojiSportUtilityVehicle className="!w-12 !h-12" />,
  [Category.HEALTH]: <FluentEmojiFaceWithThermometer className="!w-12 !h-12" />,
  [Category.DAILY]: <FluentEmojiSoap className="!w-12 !h-12" />,
  [Category.OTHER]: <FluentEmojiMoneyWithWings className="!w-12 !h-12" />,
}

const BACKGROUND_COLORS: Record<Category, string> = {
  [Category.CLOTH]: "bg-pink-200",
  [Category.EAT]:"bg-rose-200",
  [Category.ENTERTAINMENT]: "bg-violet-200",
  [Category.TRANSPORTATION]: "bg-blue-200",
  [Category.HEALTH]: "bg-yellow-200",
  [Category.DAILY]: "bg-fuchsia-200",
  [Category.OTHER]: "bg-green-200",
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
  const records = useContext(RecordContext);
  const totalConfirmed = useContext(TotalConfirmedContext);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [isPressing, setIsPressing] = useState(false);

  const confirmed = records[category].confirmed.reduce((acc, record) => acc + record.amount, 0);
  const ratio = confirmed === 0 ? 0 : (confirmed / totalConfirmed);

  return (
    <Button
      variant="outline"
      className={`relative justify-start h-fit w-full p-3 overflow-hidden select-none`}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
    >
      <div
        className={`absolute inset-0 ${BACKGROUND_COLORS[category]} transition-width duration-500 ease-in-out`}
        style={{ width: `${ratio * 100}%` }}
      ></div>
      <div className="relative z-20 flex items-end gap-2">
        {ICON[category]}
        <div className="text-3xl leading-9 font-bold flex items-end gap-1 no-click" onClick={() => navigate(`/${category}`)}>
          <CountUp end={confirmed} duration={1} />
          <ChevronsLeftRightEllipsisIcon className="!w-5 !h-5 text-muted-foreground" />
        </div>
        {records[category].unconfirmed && (
          <div className="font-bold text-red-600 leading-4">
            <div className="flex">
              <ArrowUpRightIcon className="!w-4 !h-4" />
              <CountUp end={Number(records[category].unconfirmed)} duration={0.5} />
            </div>
            <div className="flex">
              <EqualIcon className="!w-4 !h-4" />
              <CountUp end={confirmed + Number(records[category].unconfirmed)} duration={0.5} />
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
    
    if (!records[category].unconfirmed) {
      onClick(category);
      return;
    }

    setIsPressing(true);

    const timer = setTimeout(() => {
      onLongPress(category, Number(records[category].unconfirmed));
      setIsPressing(false);
    }, 1500); // 长按时间阈值（毫秒）
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
