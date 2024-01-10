'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const currency = searchParams.get('currency');
  const amount = searchParams.get('amount');

  return (
    <div className='m-auto w-1/2 py-5'>
      <div className='flex items-center border-b-2 pb-4'>
        <Image
          src={'/circle-check-solid.svg'}
          alt='success'
          width={35}
          height={35}
        />
        <label className='pl-4'>
          <b>Kabin seçiminiz tamamlandı.</b>
        </label>
      </div>
      <div className='flex justify-between pt-3 text-xl'>
        <label>Toplam tutar</label>
        <label className='text-[#406393]'>
          <b>
            {currency} {amount}
          </b>
        </label>
      </div>
    </div>
  );
}
