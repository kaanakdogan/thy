import { CategoryType, SubCategoryType } from './flight.types';
import Image from 'next/image';

export function CategoryTab({
  category,
  label,
  isExpanded,
  onClick,
}: {
  category: CategoryType;
  label: string;
  isExpanded: boolean;
  onClick: () => void;
}) {
  const ecoSubCategory = category.subcategories.find(
    (item) => item.brandCode === 'ecoFly'
  );
  return (
    <div
      className={`shadow-list text-xxs mt-3 flex grow-0 basis-1/4 items-center justify-start bg-white p-3 md:ml-3 md:mt-0 ${
        isExpanded ? 'md:-mb-3 md:pb-4' : ''
      }`}
      onClick={onClick}
    >
      <input type='radio' checked={isExpanded} readOnly />
      <label className='ml-1 mr-3 border-b border-solid border-gray-600'>
        {label}
      </label>
      <div className='flex flex-col'>
        <span>Yolcu Başına</span>
        <span className='text-xs'>
          <b>
            {ecoSubCategory?.price.currency} {ecoSubCategory?.price.amount}
          </b>
        </span>
      </div>
      <div className='ml-auto'>
        <Image
          src={isExpanded ? '/angle-up-solid.svg' : '/angle-down-solid.svg'}
          alt='caret'
          width={10}
          height={10}
        />
      </div>
    </div>
  );
}

export function CategoryContent({
  data,
  isPromoActivated,
}: {
  data: CategoryType;
  isPromoActivated: boolean;
}) {
  return (
    <div className='m-3 flex  flex-col bg-white md:translate-y-[-6px] md:flex-row md:p-3 '>
      {data.subcategories.map((item, index) => (
        <CategoryCard
          key={index}
          subCategory={item}
          isPromoActivated={isPromoActivated}
        />
      ))}
    </div>
  );
}

function getLabelByBrandCode(code: 'ecoFly' | 'extraFly' | 'primeFly') {
  switch (code) {
    case 'ecoFly':
      return 'Eco Fly';
    case 'extraFly':
      return 'Extra Fly';
    case 'primeFly':
      return 'Prime Fly';
  }
}

function CategoryCard({
  subCategory,
  isPromoActivated,
}: {
  subCategory: SubCategoryType;
  isPromoActivated: boolean;
}) {
  return (
    <div className='m-1 flex basis-1/3 flex-col bg-white'>
      <div className='flex h-10 items-center justify-between bg-[#f9f9f9] p-2'>
        <label>
          <b>{getLabelByBrandCode(subCategory.brandCode)}</b>
        </label>
        <div className='flex'>
          <span className='text-xxs pt-1'>{subCategory.price.currency}</span>
          <span>
            <b>{subCategory.price.amount}</b>
          </span>
        </div>
      </div>
      <div className='h-32 border-2 border-solid border-[#EAEAEA]'>
        {subCategory.rights.map((item, index) => (
          <div
            key={subCategory.brandCode + index}
            className='border-b-2 border-solid border-[#EAEAEA]'
          >
            {item}
          </div>
        ))}
      </div>
      <button
        className={`${
          isPromoActivated && subCategory.brandCode !== 'ecoFly'
            ? ''
            : 'bg-[#E81932] text-white'
        } h-10`}
      >
        Uçuş Seç
      </button>
    </div>
  );
}
