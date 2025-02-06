import { Category, PaymentRecord } from "@/types";
import FluentArrowCurveUpRight20Filled from "./icon/fluent-arrow-curve-up-right-20-filled";
import FluentEmojiFaceSavoringFood from "./icon/fluent-emoji-face-savoring-food";
import FluentEmojiSportUtilityVehicle from "./icon/fluent-emoji-sport-utility-vehicle";
import FluentEmojiVideoGame from "./icon/fluent-emoji-video-game";
import FluentEmojiWomansClothes from "./icon/fluent-emoji-womans-clothes";
import { Button } from "./ui/button";
import { useState } from "react";

const ICON: Record<Category, React.ReactNode> = {
  [Category.CLOTH]: <FluentEmojiWomansClothes className="!w-12 !h-12" />,
  [Category.EAT]: <FluentEmojiFaceSavoringFood className="!w-12 !h-12" />,
  [Category.ENTERTAINMENT]: <FluentEmojiVideoGame className="!w-12 !h-12" />,
  [Category.TRANSPORTATION]: <FluentEmojiSportUtilityVehicle className="!w-12 !h-12" />,
}

interface MoneyRecorderButtonProps {
  category: Category;
  records: PaymentRecord;
  onClick: () => void;
  onLongPress: () => void;
}

export default function MoneyRecorderButton({
  category,
  records,
  onClick,
  onLongPress,
}: MoneyRecorderButtonProps) {
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [isPressing, setIsPressing] = useState(false);

  const handlePressStart = () => {
    if (!records.unconfirmed) {
      onClick();
      return;
    }
    
    setIsPressing(true);
    const timer = setTimeout(() => {
      onLongPress();
      setIsPressing(false);
    }, 1500); // 长按时间阈值（毫秒）
    setPressTimer(timer);
  };

  const handlePressEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
    setIsPressing(false);
  };

  return (
    <Button
      variant="outline"
      className="relative justify-start h-fit w-full p-4 overflow-hidden" // 增加 overflow-hidden
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd} // 防止鼠标移出时触发点击
      onTouchStart={handlePressStart} // 支持触摸开始
      onTouchEnd={handlePressEnd} // 支持触摸结束
      onContextMenu={handleContextMenu}
    >
      {isPressing && (
        <div className="absolute inset-0 bg-red-600/20 animate-grow"></div>
      )}
      <div className="relative z-10 flex items-center">
        {ICON[category]}
        <span className="text-4xl leading-9 font-extrabold self-end ml-4">
          {records.confirmed.reduce((acc, record) => acc + record.amount, 0)}
        </span>
        {records.unconfirmed && (
          <div className="self-end flex items-end text-red-600">
            <FluentArrowCurveUpRight20Filled className="!w-6 !h-6" />
            <span className="text-xl leading-5 font-bold">{records.unconfirmed}</span>
          </div>
        )}
      </div>
    </Button>
  );

  function handleContextMenu(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    return false;
  }
}
