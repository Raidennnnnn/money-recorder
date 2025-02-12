import { useParams } from "react-router";
import { RecordContext } from "./record-context";
import { useContext, useMemo } from "react";
import { Category } from "@/types";
import { HomeIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigateWithTransition } from "./use-navi-with-transition";
import CategoryDetailList from "./category-detail-list";
import FluentEmojiDisguisedFace from "./icon/fluent-emoji-disguised-face";

export default function CategoryDetail() {
  const navigate = useNavigateWithTransition();
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
      <Button
        variant="outline"
        className="fixed bottom-8 right-4 px-2.5"
        onClick={() => navigate('/')}
      >
        <HomeIcon className="w-4 h-4" />
      </Button>
    </>
  );
}