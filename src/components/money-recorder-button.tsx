import { Category } from "@/types";
import { Button } from "./ui/button";
import { useContext, useRef, useState } from "react";
import CountUp from "react-countup";
import { CurrentCycleRecordsContext, TotalConfirmedContext, UnconfirmedRecordsContext } from "./app-records-contexts";
import { ArrowUpRightIcon, ChevronsLeftRightEllipsisIcon, EqualIcon } from "lucide-react";
import { useNavigateWithTransition } from "../hooks/use-navi-with-transition";
import { BACKGROUND_COLORS, ICON } from "@/lib/category-related";

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

  return <Button
    variant="outline"
    className={`relative justify-start h-fit w-full p-2.5 overflow-hidden select-none`}
    onTouchStart={handlePressStart}
    onTouchEnd={handlePressEnd}
  >
    <div
      className={`absolute inset-0 ${BACKGROUND_COLORS[category]} transition-width duration-500 ease-in-out`}
      style={{ width: `${ratio * 100}%` }}
    />
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
  </Button>;
  
  function handlePressStart(e: React.TouchEvent<HTMLButtonElement>) {
    if (
      (e.target as HTMLElement).closest('.no-click') ||
      unconfirmedRecords.amount === ''
    ) {
      return;
    }

    if (
      unconfirmedRecords.amount !== '' &&
      unconfirmedRecords.category !== category
    ) {
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
