import React, { useState } from 'react';

interface Record {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  description: string;
}

const MoneyRecorder: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [type, setType] = useState<'income' | 'expense'>('income');

  const addRecord = () => {
    const newRecord: Record = {
      id: records.length + 1,
      type,
      amount,
      description,
    };
    setRecords([...records, newRecord]);
    setAmount(0);
    setDescription('');
  };

  const totalBalance = records.reduce((acc, record) => {
    return record.type === 'income' ? acc + record.amount : acc - record.amount;
  }, 0);

  return (
    <div>
      <h1>财务记录器</h1>
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="金额"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="描述"
        />
        <select value={type} onChange={(e) => setType(e.target.value as 'income' | 'expense')}>
          <option value="income">收入</option>
          <option value="expense">支出</option>
        </select>
        <button onClick={addRecord}>添加记录</button>
      </div>
      <h2>总余额: {totalBalance}</h2>
      <ul>
        {records.map((record) => (
          <li key={record.id}>
            {record.type === 'income' ? '+' : '-'}{record.amount} - {record.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoneyRecorder; 