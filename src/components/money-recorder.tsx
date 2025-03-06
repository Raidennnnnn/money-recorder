import { useContext, useState } from 'react';
import MoneyRecorderButton from './money-recorder-button';
import { Category } from '../types';
import MoneyRecorderTotal from './money-recorder-total';
import MoneyRecorderInput from './money-recorder-input';
import CategoryDetail from './category-detail';
import { AppInputLayoutContext } from './app-input-layout-context';

const categorys = Object.values(Category).filter((c): c is Category => !isNaN(Number(c)));

export default function MoneyRecorder() {
  const { inputLayout } = useContext(AppInputLayoutContext);
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  return <div className="relative h-full">
    <div className={`absolute w-full flex flex-col gap-2 transition-[top] duration-300 ${inputLayout === 'down' ? 'top-0' : 'top-12'} `}>
      {
        categorys.map((category) => <MoneyRecorderButton
          key={category}
          category={category}
          onOpenDetail={setSelectedCategory}
        />)
      }
    </div>
    <MoneyRecorderInput className={`absolute transition-all duration-300 ${inputLayout === 'down' ? 'top-[652px]' : 'top-0'} `} />
    <MoneyRecorderTotal className='absolute bottom-0 left-1' />
    <CategoryDetail category={selectedCategory} onClose={() => setSelectedCategory(undefined)}  />
  </div>
};