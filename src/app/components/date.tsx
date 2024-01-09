import Image from 'next/image';

export function Date() {
  return (
    <div className='m-1 flex h-10 items-center bg-[#242A38] p-2 text-white'>
      <p className='pr-1'>Tarih</p>
      <Image
        src={'/calendar-days-regular.svg'}
        alt='arrival'
        width={30}
        height={30}
        className='p-1'
      />
    </div>
  );
}
