import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "./ui/table"
import { Category, ConfirmedPaymentRecord } from "@/types"

const CATEGORY_NAME = {
  [Category.EAT]: "餐饮",
  [Category.TRANSPORTATION]: "交通",
  [Category.ENTERTAINMENT]: "娱乐",
  [Category.HEALTH]: "健康",
  [Category.DAILY]: "日用品",
  [Category.CLOTH]: "服饰",
  [Category.OTHER]: "其他"
} as const;

export default function AppStatisticDayTable({ data }: { data: ConfirmedPaymentRecord[] }) {
  return <Table>
    <TableHeader>
      <TableRow>
        <TableHead>时间</TableHead>
        <TableHead>金额</TableHead>
        <TableHead>分类</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      { data.map((record) => {
        return <TableRow key={record.timeStamp + record.category}>
          <TableCell>{ new Date(record.timeStamp).toLocaleDateString() }</TableCell>
          <TableCell className={record.removed ? "line-through" : ""}>{ record.amount }</TableCell>
          <TableCell>{ CATEGORY_NAME[record.category] }</TableCell>
        </TableRow>
      }) }
    </TableBody>
  </Table>
  
}


