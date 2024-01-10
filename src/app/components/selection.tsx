'use client';

import { useEffect, useState } from 'react';
import { LocationInput } from './locationInput';
import { Date } from './date';
import { PassangerPicker } from './passangerPicker';

export function Selection() {
  const [arrival, setArrival] = useState<string>('');
  const [departure, setDeparture] = useState<string>('');
  const [passangerCount, setPassangerCount] = useState<number>(1);
  const [checkedCabin, setCheckedCabin] = useState<'ECONOMY' | 'BUSINESS'>(
    'ECONOMY'
  );

  useEffect(() => {
    console.log('arrival', arrival);
    console.log('departure', departure);
  }, [arrival, departure]);

  return (
    <div className='bg-selectionbg flex flex-wrap justify-center p-5'>
      <LocationInput
        isArrival={false}
        value={departure}
        onChange={setDeparture}
      />
      <LocationInput isArrival={true} value={arrival} onChange={setArrival} />
      <Date />
      <PassangerPicker
        checkedCabin={checkedCabin}
        setCheckedCabin={setCheckedCabin}
        passangerCount={passangerCount}
        setPassangerCount={setPassangerCount}
      />
    </div>
  );
}
