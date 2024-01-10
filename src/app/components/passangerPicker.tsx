import { useRef, useState } from 'react';
import { Popover } from './popover';
import { Person } from './svg/person';

export function PassangerPicker({
  checkedCabin,
  passangerCount,
  setPassangerCount,
  setCheckedCabin,
}: {
  checkedCabin: 'ECONOMY' | 'BUSINESS';
  passangerCount: number;
  setPassangerCount: React.Dispatch<React.SetStateAction<number>>;
  setCheckedCabin: React.Dispatch<React.SetStateAction<'ECONOMY' | 'BUSINESS'>>;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={buttonRef}
        className='m-1 flex h-10 w-14 items-center justify-center bg-[#242A38] p-2 text-white'
        onClick={() => setIsOpen(true)}
      >
        <Person className='fill-gray-400' />
        {passangerCount > 1 && <Person className='fill-gray-500' />}
        {passangerCount > 2 && <Person className='fill-gray-600' />}
        {passangerCount > 3 && <p className='text-gray-600'>+</p>}
        <span className='absolute translate-x-[15px] translate-y-[-10px] text-sm'>
          {passangerCount}
        </span>
      </button>
      <Popover
        parentRef={buttonRef}
        isOpen={isOpen}
        close={() => setIsOpen(false)}
      >
        <div className='m-3'>
          <p>Kabin ve yolcu seçimi</p>
          <div className='flex flex-wrap justify-between pt-3'>
            <div className='pr-2'>
              <input
                type='radio'
                id='ECONOMY'
                name='cabin'
                checked={checkedCabin === 'ECONOMY'}
                onChange={() => setCheckedCabin('ECONOMY')}
              />
              <label htmlFor='ECONOMY'>Economy Class</label>
            </div>
            <div>
              <input
                type='radio'
                id='BUSINESS'
                name='cabin'
                checked={checkedCabin === 'BUSINESS'}
                onChange={() => setCheckedCabin('BUSINESS')}
              />
              <label htmlFor='BUSINESS'>Business Class</label>
            </div>
          </div>
          <div className='flex flex-wrap justify-between pt-3'>
            <p>Yolcu</p>
            <div className='flex justify-center text-center'>
              <button
                className='rounded bg-gray-300 p-1 px-3 text-gray-600'
                disabled={passangerCount === 1}
                onClick={() =>
                  setPassangerCount((count) => {
                    if (count > 1) {
                      return count - 1;
                    }
                    return count;
                  })
                }
              >
                -
              </button>
              <p className='p-1 px-3'>{passangerCount}</p>
              <button
                className='rounded bg-gray-300 p-1 px-3 text-gray-600'
                onClick={() => setPassangerCount((count) => count + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </Popover>
    </>
  );
}
