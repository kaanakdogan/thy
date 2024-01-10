import { CategoryType, SubCategoryType } from './flight.types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function CategoryTab({
  category,
  label,
  isExpanded,
  onClick,
  isPriceHalved,
}: {
  category: CategoryType;
  label: string;
  isExpanded: boolean;
  onClick: () => void;
  isPriceHalved: boolean;
}) {
  const ecoSubCategory = category.subcategories.find(
    (item) => item.brandCode === 'ecoFly'
  );

  if (!ecoSubCategory) {
    return null;
  }

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
            {ecoSubCategory.price.currency}{' '}
            {isPriceHalved
              ? ecoSubCategory.price.amount / 2
              : ecoSubCategory.price.amount}
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
  count,
}: {
  data: CategoryType;
  isPromoActivated: boolean;
  count: number;
}) {
  return (
    <div className='m-3 flex  flex-col bg-white md:translate-y-[-6px] md:flex-row md:p-3 '>
      {data.subcategories.map((item, index) => (
        <CategoryCard
          key={index}
          subCategory={item}
          isPromoActivated={isPromoActivated}
          count={count}
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
  count,
}: {
  subCategory: SubCategoryType;
  isPromoActivated: boolean;
  count: number;
}) {
  const router = useRouter();

  const isDisabled = isPromoActivated && subCategory.brandCode !== 'ecoFly';
  const isPriceHalved = isPromoActivated && subCategory.brandCode === 'ecoFly';
  return (
    <div className='m-1 flex basis-1/3 flex-col bg-white'>
      <div className='flex h-10 items-center justify-between bg-[#f9f9f9] p-2'>
        <label>
          <b>{getLabelByBrandCode(subCategory.brandCode)}</b>
        </label>
        <div className='flex'>
          <span className='text-xxs pt-1'>{subCategory.price.currency}</span>
          <span>
            <b>
              {isPriceHalved
                ? subCategory.price.amount / 2
                : subCategory.price.amount}
            </b>
          </span>
        </div>
      </div>
      <div className='h-32 border-2 border-solid border-[#EAEAEA]'>
        {subCategory.rights.map((item, index) => (
          <div
            key={subCategory.brandCode + index}
            className='text-xxs border-b-2 border-solid border-[#EAEAEA] p-2'
          >
            {item}
          </div>
        ))}
      </div>
      <button
        className={`${
          isDisabled ? 'bg-gray-200 text-gray-400' : 'bg-[#E81932] text-white'
        } h-10`}
        disabled={isDisabled}
        onClick={() => {
          if (subCategory.status === 'AVAILABLE') {
            const price =
              (isPriceHalved
                ? subCategory.price.amount / 2
                : subCategory.price.amount) * count;
            router.push(
              `/SUCCESS?currency=${subCategory.price.currency}&amount=${price}`
            );
            return;
          }

          router.push('/ERROR');
        }}
      >
        <b>Uçuşu Seç</b>
      </button>
    </div>
  );
}
