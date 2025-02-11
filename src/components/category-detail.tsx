import { useParams } from "react-router";
import { RecordContext, SetPast12MonthRecordsContext } from "./record-context";
import { Fragment, useContext, useMemo } from "react";
import { Category } from "@/types";
import { HomeIcon, XIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Button } from "./ui/button";
import { useNavigateWithTransition } from "./use-navi-with-transition";

export default function CategoryDetail() {
  const navigate = useNavigateWithTransition();
  const { category } = useParams();
  const thisMonthRecords = useContext(RecordContext);
  const setPast12MonthRecords = useContext(SetPast12MonthRecordsContext);
  const records = useMemo(() => thisMonthRecords[Number(category) as Category], [thisMonthRecords, category]);

  const groupedRecords = useMemo(() => {
    // 按时间戳倒序排列记录
    const sortedRecords = [...records.confirmed].sort((a, b) => b.timeStamp - a.timeStamp);
    // 按天分组记录
    return sortedRecords.reduce((acc, record) => {
      const date = new Date(record.timeStamp).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
    }
      acc[date].push(record);
      return acc;
    }, {} as Record<string, typeof records.confirmed>);
  }, [records]);

  // 删除记录的函数
  const deleteRecord = (timeStamp: number) => {
    const updatedRecords = {
      ...records,
      confirmed: records.confirmed.filter(record => record.timeStamp !== timeStamp)
    };
    setPast12MonthRecords((prev) => {
      const [month, records] = prev[prev.length - 1];
      const other = prev.slice(0, -1);
      return [
        ...other,
        [month, {
          ...records,
          [Number(category)]: updatedRecords,
        }]
      ];
    });
  };

  if (Object.keys(groupedRecords).length === 0) {
    return null;
  }

  return (
    <>
      <Accordion type="single" collapsible defaultValue={Object.keys(groupedRecords)[0]}>
        {Object.entries(groupedRecords).map(([date, records]) => (
          <AccordionItem value={date} key={date} >
            <AccordionTrigger className="bg-white font-bold">{date}</AccordionTrigger>
            <AccordionContent>
              {records.map((record, index) => (
                <Fragment key={record.timeStamp}>
                  <div className={`${index < records.length - 1 ? "py-2" : "pt-2"} flex items-center justify-between`}>
                    <span className="text-muted-foreground">{new Date(record.timeStamp).toLocaleTimeString()}</span>
                    <span>{record.amount}</span>
                    <XIcon className="text-destructive" onClick={() => deleteRecord(record.timeStamp)} />
                  </div>
                  {index < records.length - 1 && <Separator />}
                </Fragment>
              ))}
            </AccordionContent>
          </AccordionItem >
        ))}
      </Accordion>
      <Button
        variant="outline"
        className="fixed bottom-4 right-4 px-2.5"
        onClick={() => navigate('/')}
      >
        <HomeIcon className="w-4 h-4" />
      </Button>
    </>
  );
}