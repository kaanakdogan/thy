'use client';

import { useState } from 'react';
import { FlightType } from './flight.types';
import { FlightListItem } from './flightListItem';
import { Toggle } from './toggle';

export function FlightList({ data }: { data: FlightType[] }) {
  const [toggleValue, setToggleValue] = useState<boolean>(false);
  return (
    <>
      <div className='self-start pt-3'>
        <Toggle
          label='Promosyon Kodu'
          onChange={(value) => {
            console.log('onChange', value);
            setToggleValue(value);
          }}
          enabled={toggleValue}
        />
      </div>
      <div className='shadow-list flex w-full flex-col rounded pt-5'>
        <div className='flex items-center justify-end rounded-t  bg-[#242A38] p-2 text-center text-white'>
          <span>Sıralama Kriteri</span>
          <button className='m-1 ml-3 rounded border-2 border-solid border-white p-1'>
            Ekonomi Ücreti
          </button>
          <button className='m-1 ml-3 rounded border-2 border-solid border-white p-1 pl-2 pr-2'>
            Kalkış Saati
          </button>
        </div>
        <div className='rounded-b border-2 border-t-0 border-solid border-[#EAEAEA] bg-[#F9F9F9] p-3'>
          {data.map((item, index) => (
            <FlightListItem
              key={index}
              item={item}
              isPromoActivated={toggleValue}
            />
          ))}
        </div>
      </div>
    </>
  );
}
