import { Fragment, useContext, useMemo } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { ConfirmedPaymentRecord } from '../types';
import { SetPast12CyclesRecords } from './app-records-contexts';
import { Undo2, XIcon } from 'lucide-react';

export default function CategoryDetailListV2({ records }: { records: ConfirmedPaymentRecord[] }) {
  const groupedRecords = useMemo(() => {
    // 按时间戳倒序排列记录
    const sortedRecords = [...records].sort((a, b) => b.timeStamp - a.timeStamp);
    // 按天分组记录
    return sortedRecords.reduce((acc, record) => {
      const date = new Date(record.timeStamp).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(record);
      return acc;
    }, {} as Record<string, typeof records>);
  }, [records]);

  return <Accordion type="single" collapsible defaultValue={Object.keys(groupedRecords)[0]}>
    {
      Object.entries(groupedRecords).map(([date, records]) => <AccordionItem value={date} key={date} >
        <AccordionTrigger className="bg-background font-bold">
          <CategoryDetailListItemHeader date={date} />
        </AccordionTrigger>
        <AccordionContent>
          {
            records.map((record, index) => <CategoryDetailListItemContent record={record} isLast={index === records.length - 1} />)
          }
        </AccordionContent>
      </AccordionItem >)
    }
  </Accordion>;
}

function CategoryDetailListItemHeader({ date }: { date: string }) {
  return <div className="flex gap-2 items-end justify-center">
    <span className='text-lg leading-none'>
      {new Date(date).toLocaleDateString(undefined, { day: 'numeric' })}
    </span>
    <span className="text-muted-foreground leading-none">
      {new Date(date).toLocaleDateString(undefined, { weekday: 'long' })}
    </span>
  </div>;
}

function CategoryDetailListItemContent({ record, isLast }: { record: ConfirmedPaymentRecord, isLast: boolean }) {
  const setPast12CyclesRecords = useContext(SetPast12CyclesRecords);

  return  <Fragment key={record.timeStamp}>
    <div className={`${isLast ? "pt-2" : "py-2"} flex items-center justify-between`}>
      <span className="text-muted-foreground">{new Date(record.timeStamp).toLocaleTimeString()}</span>
      <span className={`${record.removed ? "line-through" : ""}`}>{record.amount}</span>
      {
        record.removed 
          ? <Undo2 onClick={() => toggleRecord(record.timeStamp)} />
          : <XIcon className="text-destructive" onClick={() => toggleRecord(record.timeStamp)} />
      }
    </div>
  </Fragment>

  function toggleRecord(timeStamp: number) {
    setPast12CyclesRecords((prev) => {
      return prev.map(record => record.timeStamp === timeStamp 
        ? { ...record, removed: !record.removed } 
        : record)
    });
  }
}