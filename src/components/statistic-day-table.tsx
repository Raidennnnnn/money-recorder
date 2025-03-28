import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "./ui/table"
import { ConfirmedPaymentRecord } from "@/types"
import { CATEGORY_NAME } from "@/lib/category-related"

export default function StatisticDayTable({ data }: { data: ConfirmedPaymentRecord[] }) {
  return <Table id="day-table" className="mb-18">
    <TableHeader>
      <TableRow>
        <TableHead className="w-1/2">时间</TableHead>
        <TableHead className="w-1/4">金额</TableHead>
        <TableHead className="w-1/4">分类</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      { 
        data.map((record) => {
          return <TableRow key={record.timeStamp + record.category}>
            <TableCell>
              { new Date(record.timeStamp).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' }) }
            </TableCell>
            <TableCell className={record.removed ? "line-through" : ""}>
              { record.amount }
            </TableCell>
            <TableCell>
              { CATEGORY_NAME[record.category] }
            </TableCell>
          </TableRow>
        }) 
      }
    </TableBody>
  </Table>
  
}


