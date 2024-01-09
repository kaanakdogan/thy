import { Person } from './svg/person';

export function PassangerPicker() {
  return (
    <button className='m-1 flex h-10 w-14 items-center justify-center bg-[#242A38] p-2 text-white'>
      <Person className='fill-gray-50' />{' '}
    </button>
  );
}
