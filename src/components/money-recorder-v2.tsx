import { useState } from 'react';
import MoneyRecorderButton from './money-recorder-button';
import { Category } from '../types';
import MoneyRecorderFooter from './money-recorder-footer';
import CategoryDetail from './category-detail-v2';

const categorys = Object.values(Category).filter((c): c is Category => !isNaN(Number(c)));

export default function MoneyRecorderV2() {
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  return <div className="flex flex-col gap-2">
    {
      categorys.map((category) => <MoneyRecorderButton
        key={category}
        category={category}
        onOpenDetail={setSelectedCategory}
      />)
    }
    <MoneyRecorderFooter />
    <CategoryDetail category={selectedCategory} onClose={() => setSelectedCategory(undefined)}  />
  </div>
};