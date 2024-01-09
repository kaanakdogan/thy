import { Selection } from '../components/selection';

export default function Home() {
  return (
    <main className='flex h-40 flex-col items-center justify-items-center'>
      <h2 className='pt-20 text-3xl text-white'>Merhaba</h2>
      <h3 className='pb-3 text-center text-2xl text-white'>
        Nereyi keşfetmek istersiniz?
      </h3>
      <Selection />
    </main>
  );
}
