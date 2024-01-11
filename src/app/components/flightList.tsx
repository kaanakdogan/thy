'use client';

import { useState } from 'react';
import { FlightType } from './flight.types';
import { FlightListItem } from './flightListItem';
import { Toggle } from './toggle';

function sortByTime(a: FlightType, b: FlightType) {
  const aDepartureTimes = a.departureDateTimeDisplay.split(':');
  const bDepartureTimes = b.departureDateTimeDisplay.split(':');

  const aHour = parseInt(aDepartureTimes[0]);
  const bHour = parseInt(bDepartureTimes[0]);

  if (aHour < bHour) {
    return -1;
  }
  if (aHour > bHour) {
    return 1;
  }
  const aMins = parseInt(aDepartureTimes[1]);
  const bMins = parseInt(bDepartureTimes[1]);
  if (aMins < bMins) {
    return -1;
  }

  return 1;
}

function sortByPrice(a: FlightType, b: FlightType) {
  const aPrice = a.fareCategories.ECONOMY.subcategories.find(
    (item) => item.brandCode === 'ecoFly'
  );
  const bPrice = b.fareCategories.ECONOMY.subcategories.find(
    (item) => item.brandCode === 'ecoFly'
  );

  if (!aPrice || !bPrice) {
    return 0;
  }

  if (aPrice?.price.amount < bPrice?.price.amount) {
    return -1;
  }

  return 1;
}

export function FlightList({
  data,
  count,
}: {
  data: FlightType[];
  count: number;
}) {
  const [isToggleEnabled, setIsToggleValue] = useState<boolean>(false);
  const [sortType, setSortType] = useState<'time' | 'price'>('price');

  return (
    <>
      <div className='self-start pt-3'>
        <Toggle
          label='Promosyon Kodu'
          onChange={(value) => setIsToggleValue(value)}
          enabled={isToggleEnabled}
        />
      </div>
      {isToggleEnabled ? (
        <>
          <p className='text-xxs py-3'>
            Promosyon Kodu seçeneği ile tüm Economy kabini Eco Fly paketlerini
            %50 indirimle satın alabilirsiniz!
          </p>
          <p className='text-xxs pb-3'>
            Promosyon Kodu seçeneği aktifken Eco Fly paketi haricinde seçim
            yapılamamaktadır.
          </p>
        </>
      ) : null}
      <div className='shadow-list flex w-full flex-col rounded pt-5'>
        <div className='flex items-center justify-end rounded-t  bg-[#242A38] p-2 text-center text-white'>
          <span>Sıralama Kriteri</span>
          <button
            onClick={() => setSortType('price')}
            className='m-1 ml-3 rounded border-2 border-solid border-white p-1'
          >
            Ekonomi Ücreti
          </button>
          <button
            onClick={() => setSortType('time')}
            className='m-1 ml-3 rounded border-2 border-solid border-white p-1 pl-2 pr-2'
          >
            Kalkış Saati
          </button>
        </div>
        <div className='rounded-b border-2 border-t-0 border-solid border-[#EAEAEA] bg-[#F9F9F9] p-3'>
          {data
            .sort(sortType === 'time' ? sortByTime : sortByPrice)
            .map((item, index) => (
              <FlightListItem
                key={index}
                item={item}
                isPromoActivated={isToggleEnabled}
                count={count}
              />
            ))}
        </div>
      </div>
    </>
  );
}
