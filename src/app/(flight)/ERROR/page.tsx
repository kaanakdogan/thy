import { ErrorButton } from '@/app/components/errorButton';
import Image from 'next/image';

export default function Page() {
  return (
    <div className='m-auto w-1/2 py-5'>
      <div className='flex items-center border-b-2 pb-3'>
        <Image
          src={'/circle-xmark-solid.svg'}
          alt='error'
          width={35}
          height={35}
        />
        <label className='pl-4'>
          <b>Kabin seçiminiz tamamlanamadı.</b>
        </label>
      </div>
      <div className='flex justify-end pt-3'>
        <ErrorButton />
      </div>
    </div>
  );
}
