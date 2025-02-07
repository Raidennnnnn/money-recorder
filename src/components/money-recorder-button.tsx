import { Category } from "@/types";
import FluentArrowCurveUpRight20Filled from "./icon/fluent-arrow-curve-up-right-20-filled";
import FluentEmojiFaceSavoringFood from "./icon/fluent-emoji-face-savoring-food";
import FluentEmojiSportUtilityVehicle from "./icon/fluent-emoji-sport-utility-vehicle";
import FluentEmojiVideoGame from "./icon/fluent-emoji-video-game";
import FluentEmojiWomansClothes from "./icon/fluent-emoji-womans-clothes";
import { Button } from "./ui/button";
import { useContext, useState } from "react";
import CountUp from "react-countup";
import { RecordContext, TotalConfirmedContext } from "./record-context";

const ICON: Record<Category, React.ReactNode> = {
  [Category.CLOTH]: <FluentEmojiWomansClothes className="!w-12 !h-12" />,
  [Category.EAT]: <FluentEmojiFaceSavoringFood className="!w-12 !h-12" />,
  [Category.ENTERTAINMENT]: <FluentEmojiVideoGame className="!w-12 !h-12" />,
  [Category.TRANSPORTATION]: <FluentEmojiSportUtilityVehicle className="!w-12 !h-12" />,
}

const BACKGROUND_COLORS: Record<Category, string> = {
  [Category.CLOTH]: "bg-pink-200",
  [Category.EAT]:"bg-yellow-200",
  [Category.ENTERTAINMENT]: "bg-violet-200",
  [Category.TRANSPORTATION]: "bg-blue-200",
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
  const records = useContext(RecordContext);
  const totalConfirmed = useContext(TotalConfirmedContext);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [isPressing, setIsPressing] = useState(false);

  const confirmed = records[category].confirmed;
  const ratio = confirmed === 0 ? 0 : (confirmed / totalConfirmed);

  const handlePressStart = () => {
    setIsPressing(true);

    const timer = setTimeout(() => {
      onLongPress(category, Number(records[category].unconfirmed));
      setIsPressing(false);
    }, 1500); // 长按时间阈值（毫秒）
    setPressTimer(timer);
  };

  const handlePressEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);

      if (isPressing) {
        onClick(category);
      }
    }
    setIsPressing(false);
  };

  return (
    <Button
      variant="outline"
      className="relative justify-start h-fit w-full p-4 overflow-hidden"
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onContextMenu={handleContextMenu}
    >
      <div
        className={`absolute inset-0 ${BACKGROUND_COLORS[category]} transition-width duration-500 ease-in-out`}
        style={{ width: `${ratio * 100}%` }}
      ></div>
      <div className="relative z-20 flex items-center">
        {ICON[category]}
        <span className="text-4xl leading-9 font-extrabold self-end ml-4">
          <CountUp end={confirmed} duration={1} />
        </span>
        {records[category].unconfirmed && (
          <div className="self-end flex items-end text-red-600">
            <FluentArrowCurveUpRight20Filled className="!w-6 !h-6" />
            <span className="text-xl leading-5 font-bold">
              <CountUp end={Number(records[category].unconfirmed)} duration={0.5} />
            </span>
          </div>
        )}
      </div>
      {isPressing && (
        <div className="absolute bottom-0 left-0 h-1 bg-destructive animate-grow"></div>
      )}
    </Button>
  );

  function handleContextMenu(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    return false;
  }
}
