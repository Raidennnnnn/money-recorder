import { useContext } from "react";
import { useMemo } from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "./ui/drawer";
import { CurrentCycleRecordsContext } from "./app-records-contexts";
import { Category } from "@/types";
import CategoryDetailListV2 from "./category-detail-list";
import { FluentEmojiDisguisedFace } from "./icon/fluent-emoji-disguised-face";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function CategoryDetail({
  category,
  onClose
}: {
  category: Category | undefined,
  onClose: () => void
}) {
  const currentCycleRecords = useContext(CurrentCycleRecordsContext);

  const records = useMemo(
    () => currentCycleRecords.filter(record => record.category === category), 
    [currentCycleRecords, category]
  );

  return <Drawer open={category !== undefined} onClose={onClose}>
    <DrawerContent className="min-h-[500px]">
      <VisuallyHidden>
        <DrawerHeader>
          <DrawerTitle>类目详情</DrawerTitle>
        </DrawerHeader>
        <DrawerDescription>
          查看类目详情
        </DrawerDescription>
      </VisuallyHidden>
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