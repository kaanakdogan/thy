import Image from 'next/image';

type LocationInputProps = {
  isArrival: boolean;
  value: string;
  onChange: (value: string) => void;
};

export function LocationInput({
  isArrival,
  value,
  onChange,
}: LocationInputProps) {
  return (
    <div className='m-1 flex h-10 bg-white p-1'>
      <Image
        src={
          isArrival ? '/plane-arrival-solid.svg' : '/plane-departure-solid.svg'
        }
        alt='arrival'
        width={30}
        height={30}
        className='p-1'
      />
      <input
        className='w-20 p-1'
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
}
