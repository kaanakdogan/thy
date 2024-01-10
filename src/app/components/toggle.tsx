export function Toggle({
  label,
  onChange,
  enabled,
}: {
  label: string;
  onChange: (e: boolean) => void;
  enabled: boolean;
}) {
  return (
    <div className='flex'>
      <span className='mr-2 text-sm font-medium text-gray-900'>
        <b>{label}</b>
      </span>
      <label className='relative mr-5 inline-flex cursor-pointer items-center'>
        <input
          type='checkbox'
          className='peer sr-only'
          checked={enabled}
          readOnly
        />
        <div
          onClick={() => {
            onChange(!enabled);
          }}
          className="peer h-6 w-11 rounded-full bg-gray-200  after:absolute  after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"
        ></div>
      </label>
    </div>
  );
}
