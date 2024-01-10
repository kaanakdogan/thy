'use client';

import { useEffect, useState } from 'react';
import { LocationInput } from './locationInput';
import { Date } from './date';
import { PassangerPicker } from './passangerPicker';
import { getFlightsUrl } from '../actions';
import { Modal } from './modal';
import { useRouter } from 'next/navigation';

export function Selection() {
  const [arrival, setArrival] = useState<string>('');
  const [departure, setDeparture] = useState<string>('');
  const [passangerCount, setPassangerCount] = useState<number>(1);
  const [checkedCabin, setCheckedCabin] = useState<'ECONOMY' | 'BUSINESS'>(
    'ECONOMY'
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const _arrival = localStorage.getItem('arrival');
    if (_arrival) {
      setArrival(_arrival);
    }

    const _departure = localStorage.getItem('departure');
    if (_departure) {
      setDeparture(_departure);
    }
    const _passangerCount = localStorage.getItem('passangerCount');
    if (_passangerCount) {
      setPassangerCount(parseInt(_passangerCount));
    }

    const _checkedCabin = localStorage.getItem('checkedCabin');
    if (_checkedCabin) {
      setCheckedCabin(_checkedCabin as 'ECONOMY' | 'BUSINESS');
    }
  }, []);

  const onSubmit = () => {
    getFlightsUrl(arrival, departure)
      .then((res) => {
        localStorage.setItem('arrival', arrival);
        localStorage.setItem('departure', departure);
        localStorage.setItem('passangerCount', passangerCount.toString());
        localStorage.setItem('checkedCabin', checkedCabin);
        router.push(
          `/${res.departureCode}/${res.arrivalCode}/${passangerCount}`
        );
      })
      .catch((e) => {
        setError(e.message);
        setIsModalOpen(true);
      });
  };

  return (
    <>
      <div className='bg-selectionbg align-center flex flex-wrap justify-center p-5'>
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
        <button className='m-1 w-5 bg-[#E81932] text-white' onClick={onSubmit}>
          {'>'}
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {error}
      </Modal>
    </>
  );
}
