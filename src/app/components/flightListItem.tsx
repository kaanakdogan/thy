import { useState } from 'react';
import { CategoryContent, CategoryTab } from './category';
import { FlightType } from './flight.types';

type Category = 'ECONOMY' | 'BUSINESS' | null;

export function FlightListItem({
  item,
  isPromoActivated,
  count,
}: {
  item: FlightType;
  isPromoActivated: boolean;
  count: number;
}) {
  const [expandedCategory, setExpandedCategory] = useState<Category>(null);

  const setCategory = (category: Category) => {
    setExpandedCategory((current) => {
      if (current !== category) {
        return category;
      }
      return null;
    });
  };

  return (
    <>
      <div className='m-3 flex flex-col justify-between md:flex-row'>
        <div className='shadow-list flex grow-0 basis-1/2 items-center bg-white p-3 text-xs'>
          <div className='flex flex-col items-start justify-center pr-2'>
            <span>
              <b>{item.departureDateTimeDisplay}</b>
            </span>
            <span className='text-gray-600'>
              {item.originAirport.city.code}
            </span>
            <span className='text-xxs text-gray-600'>
              {item.originAirport.city.name}
            </span>
          </div>
          <div className='grow border-b border-gray-600 p-1'></div>
          <div className='flex flex-col items-end justify-center pl-2'>
            <span>
              <b>{item.arrivalDateTimeDisplay}</b>
            </span>
            <span className='text-gray-600'>
              {item.destinationAirport.city.code}
            </span>
            <span className='text-xxs text-gray-600'>
              {item.destinationAirport.city.name}
            </span>
          </div>
          <div className='flex flex-col items-center justify-center pl-4 pr-3'>
            <span className='text-xxs text-gray-600'>Uçuş Süresi</span>
            <span className=''>
              <b>{item.flightDuration}</b>
            </span>
          </div>
        </div>
        <CategoryTab
          category={item.fareCategories.ECONOMY}
          label={'ECONOMY'}
          isExpanded={expandedCategory === 'ECONOMY'}
          onClick={() => setCategory('ECONOMY')}
          isPriceHalved={isPromoActivated}
        />
        <CategoryTab
          category={item.fareCategories.BUSINESS}
          label={'BUSINESS'}
          isExpanded={expandedCategory === 'BUSINESS'}
          onClick={() => setCategory('BUSINESS')}
          isPriceHalved={false}
        />
      </div>
      {expandedCategory ? (
        <CategoryContent
          data={item.fareCategories[expandedCategory]}
          isPromoActivated={isPromoActivated}
          count={count}
        />
      ) : null}
    </>
  );
}
