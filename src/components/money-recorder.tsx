import { useState } from 'react';
import MoneyRecorderButton from './money-recorder-button';
import { Category } from '../types';
import MoneyRecorderTotal from './money-recorder-total';
import MoneyRecorderInput from './money-recorder-input';
import CategoryDetail from './category-detail';

const categorys = Object.values(Category).filter((c): c is Category => !isNaN(Number(c)));

export default function MoneyRecorder() {
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  return <div className="flex flex-col gap-2">
    {
      categorys.map((category) => <MoneyRecorderButton
        key={category}
        category={category}
        onOpenDetail={setSelectedCategory}
      />)
    }
    <MoneyRecorderTotal />
    <MoneyRecorderInput />
    <CategoryDetail category={selectedCategory} onClose={() => setSelectedCategory(undefined)}  />
  </div>
};