export function Header({ theme }: { theme: 'dark' | 'light' }) {
  return (
    <div
      className={`flex justify-between border-b-2 ${
        theme === 'dark'
          ? 'border-gray-100/50 text-white'
          : 'border-gray-300 text-gray-600'
      }`}
    >
      <span>
        <b>turkishairlines.com</b>
      </span>
      <span className='text-right'>
        search<b>Flight Challenge</b>
      </span>
    </div>
  );
}
