import { useParams } from "react-router";
import { CurrentCycleRecordsContext } from "./app-records-contexts";
import { useContext, useMemo } from "react";
import { Category } from "@/types";
import CategoryDetailListV2 from "./category-detail-list-v2";
import FluentEmojiDisguisedFace from "./icon/fluent-emoji-disguised-face";
import BackHomeButton from "./back-home-button";
import AppSettings from "./app-settings";

export default function CategoryDetail() {
  const { category } = useParams();
  const currentCycleRecords = useContext(CurrentCycleRecordsContext);

  const records = useMemo(
    () => currentCycleRecords.filter(record => record.category === Number(category) as Category), 
    [currentCycleRecords, category]
  );

  return <>
    {
      records.length > 0 
        ? <CategoryDetailListV2 records={records} />
        : <div className="flex flex-col items-center justify-center h-screen">
          <FluentEmojiDisguisedFace className="w-24 h-24" />  
          <span className="text-muted-foreground">暂无记录</span>
        </div>
    }
    <div className="fixed bottom-8 right-4 flex gap-2">
      <AppSettings />
      <BackHomeButton />
    </div>
  </>;
}