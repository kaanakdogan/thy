export function Toggle({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}) {
  return (
    <div className='flex'>
      <div className='pr-5 text-center text-sm'>
        <b>{label}</b>
      </div>
      <label className='relative inline-flex cursor-pointer items-center'>
        <input
          type='checkbox'
          value={value}
          className='peer sr-only'
          onChange={onChange}
        />
        <div className="peer h-5 w-11 rounded-full bg-gray-300 after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 "></div>
      </label>
    </div>
  );
}
