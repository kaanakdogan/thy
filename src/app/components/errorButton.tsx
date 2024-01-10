'use client';
import { useRouter } from 'next/navigation';

export function ErrorButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/')}
      className='text-xxs rounded bg-[#E81932] px-7 py-3 text-white'
    >
      Başa Dön
    </button>
  );
}
