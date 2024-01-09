import { useRef, useState } from 'react';
import { Popover } from './popover';
import { Person } from './svg/person';

export function PassangerPicker() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={buttonRef}
        className='m-1 flex h-10 w-14 items-center justify-center bg-[#242A38] p-2 text-white'
        onClick={() => setIsOpen(true)}
      >
        <Person className='fill-gray-50' />{' '}
      </button>
      <Popover
        parentRef={buttonRef}
        isOpen={isOpen}
        close={() => setIsOpen(false)}
      >
        <div>Test</div>
      </Popover>
    </>
  );
}
