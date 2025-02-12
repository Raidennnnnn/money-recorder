import { useParams } from "react-router";
import { RecordContext } from "./record-context";
import { useContext, useMemo } from "react";
import { Category } from "@/types";
import CategoryDetailList from "./category-detail-list";
import FluentEmojiDisguisedFace from "./icon/fluent-emoji-disguised-face";
import BackHomeButton from "./back-home-button";

export default function CategoryDetail() {
  const { category } = useParams();
  const thisMonthRecords = useContext(RecordContext);
  const records = useMemo(() => thisMonthRecords[Number(category) as Category], [thisMonthRecords, category]);

  return (
    <>
      {
        records.confirmed.length > 0 
          ? <CategoryDetailList records={records} category={Number(category) as Category} />
          : <div className="flex flex-col items-center justify-center h-screen">
            <FluentEmojiDisguisedFace className="w-24 h-24" />  
            <span className="text-muted-foreground">暂无记录</span>
          </div>
      }
      <BackHomeButton />
    </>
  );
}