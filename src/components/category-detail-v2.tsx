import { useContext } from "react";
import { useMemo } from "react";
import { Drawer, DrawerContent } from "../components/ui/drawer";
import { CurrentCycleRecordsContext } from "./app-records-contexts";
import { Category } from "@/types";
import CategoryDetailListV2 from "./category-detail-list-v2";
import { FluentEmojiDisguisedFace } from "./icon";

export default function CategoryDetail({
  category,
  onClose
}: {
  category: Category | undefined,
  onClose: () => void
}) {
  const currentCycleRecords = useContext(CurrentCycleRecordsContext);

  const records = useMemo(
    () => currentCycleRecords.filter(record => record.category === Number(category) as Category), 
    [currentCycleRecords, category]
  );

  return <Drawer open={!!category} onClose={onClose}>
    <DrawerContent className="min-h-[500px]">
      {
        records.length > 0 
          ? <CategoryDetailListV2 records={records} />
          : <div className="flex flex-col items-center justify-center flex-1">
            <FluentEmojiDisguisedFace className="w-24 h-24" />  
            <span className="text-muted-foreground">暂无记录</span>
          </div>
      }
    </DrawerContent>
  </Drawer>
}